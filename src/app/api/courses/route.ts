
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import CourseModel from '../../../models/Course';
import mongoose from 'mongoose';
import { ITEMS_PER_PAGE, CATEGORIES as APP_CATEGORIES } from '@/lib/constants';

export const dynamic = 'force-dynamic'; // Ensure no caching on this route

export async function GET(request: NextRequest) {
  console.log('🟢 [/api/courses] GET request received - V5 with Full Filters');
  try {
    await dbConnect();
    const dbName = mongoose.connection.db.databaseName;
    console.log('🟢 [/api/courses] MongoDB connected. DB Name:', dbName);

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || String(ITEMS_PER_PAGE), 10);
    const skip = (page - 1) * limit;

    const queryOptions: mongoose.FilterQuery<typeof CourseModel> = {
        approvalStatus: 'approved' // Only show approved courses by default
    };

    // Search Query Filter (Text Search)
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      queryOptions.$text = { $search: searchQuery };
      console.log(`🟢 [/api/courses] Applying text search: "${searchQuery}"`);
    }

    // Category Filter
    const categorySlugs = searchParams.getAll('category');
    if (categorySlugs.length > 0) {
      const categoryNames = categorySlugs.map(slug => {
        const foundCategory = APP_CATEGORIES.find(c => c.slug === slug);
        return foundCategory ? foundCategory.name : null;
      }).filter(name => name !== null) as string[];
      if (categoryNames.length > 0) {
        queryOptions.category = { $in: categoryNames };
        console.log(`🟢 [/api/courses] Applying category filter (names):`, categoryNames);
      }
    }

    // Price Range Filter
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const priceQuery: any = {};
    if (minPriceParam) {
      const minPrice = parseFloat(minPriceParam);
      if (minPrice > 0) priceQuery.$gte = minPrice;
    }
    if (maxPriceParam) {
      const maxPrice = parseFloat(maxPriceParam);
      // Assuming MAX_PRICE constant is defined elsewhere if used for upper bound check
      // For now, if maxPriceParam is present, use it.
      if (maxPrice > 0) priceQuery.$lte = maxPrice;
    }
    if (Object.keys(priceQuery).length > 0) {
      queryOptions.price = priceQuery;
      console.log(`🟢 [/api/courses] Applying price filter:`, priceQuery);
    }

    // Rating Filter
    const ratingsParams = searchParams.getAll('rating').map(Number);
    if (ratingsParams.length > 0) {
      const minRating = Math.min(...ratingsParams); // e.g., if [4, 5] selected, means rating >= 4
      queryOptions.rating = { $gte: minRating };
      console.log(`🟢 [/api/courses] Applying rating filter: >= ${minRating}`);
    }

    // Difficulty Level Filter
    const levels = searchParams.getAll('level');
    if (levels.length > 0) {
      queryOptions.level = { $in: levels };
      console.log(`🟢 [/api/courses] Applying difficulty filter:`, levels);
    }

    // Seller Type (Instructor Type) Filter
    const instructorTypes = searchParams.getAll('instructor');
    if (instructorTypes.length > 0) {
      queryOptions['providerInfo.type'] = { $in: instructorTypes };
      console.log(`🟢 [/api/courses] Applying seller type filter:`, instructorTypes);
    }
    
    // Language Filter
    const languages = searchParams.getAll('language');
    if (languages.length > 0) {
      queryOptions.language = { $in: languages };
      console.log(`🟢 [/api/courses] Applying language filter:`, languages);
    }

    // Certification Filter
    if (searchParams.get('certification') === 'true') {
      queryOptions.certificateAvailable = true;
      console.log(`🟢 [/api/courses] Applying certification filter: true`);
    }
    
    console.log('🟢 [/api/courses] Final Query Options:', JSON.stringify(queryOptions));

    // Sorting Logic
    let sortOption: any = { createdAt: -1 }; // Default sort
    const sortParam = searchParams.get('sort');

    if (sortParam === 'price_asc') sortOption = { price: 1 };
    else if (sortParam === 'price_desc') sortOption = { price: -1 };
    else if (sortParam === 'rating_desc') sortOption = { rating: -1, reviewsCount: -1 };
    else if (sortParam === 'newest') sortOption = { createdAt: -1 }; // `lastUpdated` could also be an option
    else if (sortParam === 'popularity') sortOption = { studentsEnrolledCount: -1 };
    else if (sortParam === 'relevance' && queryOptions.$text) {
      sortOption = { score: { $meta: "textScore" } };
    }
    console.log(`🟢 [/api/courses] Applying sort:`, sortOption);


    let totalCourses = 0;
    let coursesFromQuery: any[] = [];

    try {
      totalCourses = await CourseModel.countDocuments(queryOptions);
      console.log(`🟢 [/api/courses] CourseModel.countDocuments with filters successful, count: ${totalCourses}`);
      
      let query = CourseModel.find(queryOptions);
      if (sortParam === 'relevance' && queryOptions.$text) {
        query = query.select({ score: { $meta: "textScore" } } as any); // Cast to any if type issues
      }
      
      coursesFromQuery = await query
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .populate('seller', 'name avatarUrl verificationStatus bio') // Populate seller details
        .lean();
        
      console.log(`🟢 [/api/courses] CourseModel.find successful, courses found: ${coursesFromQuery.length}, skip: ${skip}, limit: ${limit}`);
      if (coursesFromQuery.length > 0 && coursesFromQuery[0]._id) {
        console.log(`🟢 [/api/courses] First course from model _id:`, JSON.stringify(coursesFromQuery[0]._id));
      }

    } catch (modelError: any) {
      console.error(`🔴 [/api/courses] Error during CourseModel operations:`, modelError.message, modelError.stack);
      return NextResponse.json({
        message: 'Failed to fetch courses due to a model error.',
        error: modelError.message,
      }, { status: 500 });
    }

    const coursesToReturn = coursesFromQuery.map(course => {
      try {
        let sellerDisplayInfo: any = { name: 'Unknown Seller' };
        if (course.seller && typeof course.seller === 'object' && course.seller._id) {
          // Seller is populated correctly
          sellerDisplayInfo = {
            id: course.seller._id.toString(),
            name: course.seller.name || 'Seller Placeholder',
            avatarUrl: course.seller.avatarUrl,
            verificationStatus: course.seller.verificationStatus,
            bio: course.seller.bio,
          };
        } else if (course.providerInfo) {
          // Fallback to providerInfo if seller is not populated or invalid
          sellerDisplayInfo = {
            name: course.providerInfo.name || 'Unknown Seller',
            logoUrl: course.providerInfo.logoUrl,
            verified: course.providerInfo.verified,
            // Note: providerInfo might not have a separate 'id' unless it's the course's sellerId
            id: course.seller?.toString() || undefined // Attempt to get original sellerId if available
          };
        } else if (course.seller) {
            // If seller is just an ID (not populated)
            sellerDisplayInfo = { name: 'Seller ID: ' + course.seller.toString(), id: course.seller.toString() };
        }


        return {
          ...course, // Spread the original lean course document
          id: course._id?.toString(), // Ensure id is a string
          _id: course._id?.toString(), // Ensure _id is also stringified
          seller: sellerDisplayInfo, // Use the processed sellerDisplayInfo
          title: course.title || "Untitled Course",
          category: course.category || "Uncategorized",
          imageUrl: course.imageUrl || "https://placehold.co/600x400.png",
          price: course.price === undefined ? 0 : course.price,
          rating: course.rating === undefined ? 0 : course.rating,
          reviewsCount: course.reviewsCount === undefined ? 0 : course.reviewsCount,
          // providerInfo is already part of '...course', ensure it has defaults if accessed directly elsewhere
          providerInfo: course.providerInfo || { name: course.instructor || "Unknown Seller" }
        };
      } catch (mapError: any) {
        console.error(`🔴 [/api/courses] Error processing course in map (ID: ${course._id || 'unknown'}):`, mapError.message, mapError.stack);
        return null; // Skip this course if it causes an error during mapping
      }
    }).filter(course => course !== null) as any[]; // Filter out nulls from mapping errors


    const totalPages = Math.ceil(totalCourses / limit);

    console.log(`🟢 [/api/courses] Preparing to return ${coursesToReturn.length} courses (Page: ${page}, Limit: ${limit}, TotalPages: ${totalPages}, TotalCourses: ${totalCourses}).`);

    return NextResponse.json({
      courses: coursesToReturn,
      totalPages: totalPages,
      currentPage: page,
      totalCourses: totalCourses,
    });

  } catch (error: any) {
    console.error('🔴 Failed to fetch courses (API Route /api/courses/route.ts V5):', error);
    return NextResponse.json({
        message: 'Failed to fetch courses from API (V5).',
        errorName: error.name,
        errorMessage: error.message,
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    if (body.seller && typeof body.seller === 'string' && mongoose.Types.ObjectId.isValid(body.seller)) {
        body.seller = new mongoose.Types.ObjectId(body.seller);
    } else if (body.seller && typeof body.seller === 'string') {
        // Handle invalid seller ID string, e.g., by unsetting it or logging a warning
        console.warn(`[API /api/courses POST] Invalid seller ID string received: ${body.seller}. Unsetting seller field.`);
        delete body.seller; // Or handle as per your application logic
    }
    
    const newCourse = new CourseModel({
      ...body,
      approvalStatus: 'pending', 
    });
    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: any) {
    console.error('🔴 Failed to create course (API Route /api/courses/route.ts POST):', error);
    if (error.name === 'ValidationError') {
      let errors: Record<string, string> = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return NextResponse.json({ message: 'Mongoose validation failed', errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to create course', error: error.message, details: error.stack }, { status: 400 });
  }
}
    
