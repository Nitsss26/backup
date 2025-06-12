
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import CourseModel, { type ICourse } from '../../../models/Course';
import UserModel, { type IUser } from '../../../models/User'; // Import IUser for type casting
import mongoose from 'mongoose';
import { ITEMS_PER_PAGE, CATEGORIES as APP_CATEGORIES } from '@/lib/constants';

export const dynamic = 'force-dynamic'; // Ensure no caching on this route

export async function GET(request: NextRequest) {
  console.log('🟢 [/api/courses] GET request received - V6 with Enhanced Robustness');
  try {
    await dbConnect();
    const dbName = mongoose.connection.db.databaseName;
    console.log('🟢 [/api/courses] MongoDB connected. DB Name:', dbName);

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || String(ITEMS_PER_PAGE), 10);
    const skip = (page - 1) * limit;

    const queryOptions: mongoose.FilterQuery<typeof CourseModel> = {
        approvalStatus: 'approved' 
    };

    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      queryOptions.$text = { $search: searchQuery };
    }

    const categorySlugs = searchParams.getAll('category');
    if (categorySlugs.length > 0) {
      const categoryNames = categorySlugs.map(slug => {
        const foundCategory = APP_CATEGORIES.find(c => c.slug === slug);
        return foundCategory ? foundCategory.name : null;
      }).filter(name => name !== null) as string[];
      if (categoryNames.length > 0) {
        queryOptions.category = { $in: categoryNames };
      }
    }

    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const priceQuery: any = {};
    if (minPriceParam) {
      const minPrice = parseFloat(minPriceParam);
      if (minPrice > 0) priceQuery.$gte = minPrice;
    }
    if (maxPriceParam) {
      const maxPrice = parseFloat(maxPriceParam);
      if (maxPrice > 0) priceQuery.$lte = maxPrice;
    }
    if (Object.keys(priceQuery).length > 0) {
      queryOptions.price = priceQuery;
    }

    const ratingsParams = searchParams.getAll('rating').map(Number);
    if (ratingsParams.length > 0) {
      const minRating = Math.min(...ratingsParams);
      queryOptions.rating = { $gte: minRating };
    }

    const levels = searchParams.getAll('level');
    if (levels.length > 0) {
      queryOptions.level = { $in: levels };
    }

    const instructorTypes = searchParams.getAll('instructor');
    if (instructorTypes.length > 0) {
      queryOptions['providerInfo.type'] = { $in: instructorTypes };
    }
    
    const languages = searchParams.getAll('language');
    if (languages.length > 0) {
      queryOptions.language = { $in: languages };
    }

    if (searchParams.get('certification') === 'true') {
      queryOptions.certificateAvailable = true;
    }
    
    let sortOption: any = { createdAt: -1 }; 
    const sortParam = searchParams.get('sort');

    if (sortParam === 'price_asc') sortOption = { price: 1 };
    else if (sortParam === 'price_desc') sortOption = { price: -1 };
    else if (sortParam === 'rating_desc') sortOption = { rating: -1, reviewsCount: -1 };
    else if (sortParam === 'newest') sortOption = { createdAt: -1 }; 
    else if (sortParam === 'popularity') sortOption = { studentsEnrolledCount: -1 };
    else if (sortParam === 'relevance' && queryOptions.$text) {
      sortOption = { score: { $meta: "textScore" } };
    }

    let totalCourses = 0;
    let coursesFromQuery: any[] = [];

    try {
      totalCourses = await CourseModel.countDocuments(queryOptions);
      
      let query = CourseModel.find(queryOptions);
      if (sortParam === 'relevance' && queryOptions.$text) {
        query = query.select({ score: { $meta: "textScore" } } as any);
      }
      
      coursesFromQuery = await query
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .populate({
            path: 'seller',
            model: UserModel, // Explicitly provide the model
            select: 'name avatarUrl verificationStatus bio'
        })
        .lean();
        
    } catch (modelError: any) {
      console.error(`🔴 [/api/courses] Error during CourseModel operations:`, modelError.message, modelError.stack);
      return NextResponse.json({
        message: 'Failed to fetch courses due to a database query error.',
        error: modelError.message,
      }, { status: 500 });
    }

    const coursesToReturn = coursesFromQuery.map(course => {
      try {
        if (!course || typeof course !== 'object') {
          console.warn(`[API /api/courses] Skipping invalid course object during mapping:`, course);
          return null;
        }

        let sellerDisplayInfo: any = { name: 'Unknown Seller', id: undefined, avatarUrl: undefined, verificationStatus: 'unverified', bio: undefined, type: 'Individual' };

        if (course.seller && typeof course.seller === 'object' && course.seller !== null && '_id' in course.seller && course.seller._id) {
          const populatedSeller = course.seller as IUser;
          sellerDisplayInfo = {
            id: populatedSeller._id?.toString(),
            name: populatedSeller.name || 'Seller Name Unavailable',
            avatarUrl: populatedSeller.avatarUrl,
            verificationStatus: populatedSeller.verificationStatus || 'unverified',
            bio: populatedSeller.bio,
            // type: populatedSeller.role === 'provider' ? ( (populatedSeller as any).providerType || 'Individual') : 'Individual' // Example of deriving type if needed
          };
        } else if (course.providerInfo && typeof course.providerInfo === 'object') {
          sellerDisplayInfo = {
            name: course.providerInfo.name || 'Seller Name (from ProviderInfo)',
            avatarUrl: course.providerInfo.logoUrl, // Using logoUrl as avatarUrl
            verified: course.providerInfo.verified || false,
            id: course.seller?.toString() || undefined, // Use original seller ObjectId if available
            type: course.providerInfo.type || 'Individual',
            description: course.providerInfo.description
          };
        } else if (course.seller) { 
            sellerDisplayInfo = { name: 'Seller ID: ' + course.seller.toString(), id: course.seller.toString() };
        }


        return {
          ...course,
          id: course._id?.toString(),
          _id: course._id?.toString(), 
          seller: sellerDisplayInfo, 
          title: course.title || "Untitled Course",
          category: course.category || "Uncategorized",
          imageUrl: course.imageUrl || "https://placehold.co/600x400.png",
          price: typeof course.price === 'number' ? course.price : 0,
          rating: typeof course.rating === 'number' ? course.rating : 0,
          reviewsCount: typeof course.reviewsCount === 'number' ? course.reviewsCount : 0,
          providerInfo: course.providerInfo || { name: course.instructor || "Unknown Seller Details", type: 'Individual' },
          curriculum: Array.isArray(course.curriculum) ? course.curriculum.map((mod: any) => ({
            ...mod,
            id: mod._id?.toString() || mod.id,
            lessons: Array.isArray(mod.lessons) ? mod.lessons.map((lesson: any) => ({
                ...lesson,
                id: lesson._id?.toString() || lesson.id
            })) : []
          })) : [],
          studentsEnrolledCount: typeof course.studentsEnrolledCount === 'number' ? course.studentsEnrolledCount : 0,
        };
      } catch (mapError: any) {
        console.error(`🔴 [/api/courses] Error processing course in map (ID: ${course?._id || 'unknown'}):`, mapError.message, mapError.stack);
        return null; 
      }
    }).filter(course => course !== null) as any[];


    const totalPages = Math.ceil(totalCourses / limit);

    return NextResponse.json({
      courses: coursesToReturn,
      totalPages: totalPages,
      currentPage: page,
      totalCourses: totalCourses,
    });

  } catch (error: any) {
    console.error('🔴 Failed to fetch courses (API Route /api/courses GET V6):', error);
    console.error('🔴 Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return NextResponse.json({
        message: 'Failed to fetch courses from API (V6). An unexpected server error occurred.',
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack, // Include stack for more details
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    if (body.seller && typeof body.seller === 'string' && !mongoose.Types.ObjectId.isValid(body.seller)) {
        console.warn(`[API /api/courses POST] Invalid seller ID string received: ${body.seller}. Unsetting seller field.`);
        delete body.seller;
    } else if (body.seller && typeof body.seller === 'string' && mongoose.Types.ObjectId.isValid(body.seller)) {
        body.seller = new mongoose.Types.ObjectId(body.seller);
    }
    
    const newCourse = new CourseModel({
      ...body,
      approvalStatus: 'pending', 
    });
    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: any) {
    console.error('🔴 Failed to create course (API Route /api/courses POST V6):', error);
    if (error.name === 'ValidationError') {
      let errors: Record<string, string> = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return NextResponse.json({ message: 'Mongoose validation failed', errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to create course', error: error.message, errorStack: error.stack }, { status: 400 });
  }
}
    
