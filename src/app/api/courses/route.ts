
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import CourseModel from '../../../models/Course';
import mongoose from 'mongoose';
import { ITEMS_PER_PAGE } from '@/lib/constants'; // Import default items per page

export const dynamic = 'force-dynamic'; // Ensure no caching on this route

export async function GET(request: NextRequest) {
  console.log('🟢 [/api/courses] GET request received - V4 with Pagination');
  try {
    await dbConnect();
    console.log('🟢 [/api/courses] MongoDB connected successfully. ReadyState:', mongoose.connection.readyState);
    const dbName = mongoose.connection.db.databaseName;
    console.log('🟢 [/api/courses] Current DB Name:', dbName);

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || String(ITEMS_PER_PAGE), 10); // Use ITEMS_PER_PAGE as default
    const skip = (page - 1) * limit;

    // TODO: Add back filtering and sorting logic here once basic pagination is confirmed
    const queryOptions: mongoose.FilterQuery<typeof CourseModel> = {}; // Placeholder for future filters

    let totalCourses = 0;
    let coursesFromQuery: any[] = [];
    let queryMethod = "Mongoose Model";

    try {
      totalCourses = await CourseModel.countDocuments(queryOptions);
      console.log(`🟢 [/api/courses] CourseModel.countDocuments(${JSON.stringify(queryOptions)}) successful, count: ${totalCourses}`);
      
      coursesFromQuery = await CourseModel.find(queryOptions)
        .populate('seller', 'name avatarUrl verificationStatus bio') // Keep basic populate
        .sort({ createdAt: -1 }) // Default sort, can be parameterized later
        .skip(skip)
        .limit(limit)
        .lean();
      console.log(`🟢 [/api/courses] ${queryMethod} find successful, courses found: ${coursesFromQuery.length}, skip: ${skip}, limit: ${limit}`);
      if (coursesFromQuery.length > 0) {
        console.log(`🟢 [/api/courses] First course from ${queryMethod} _id:`, JSON.stringify(coursesFromQuery[0]._id));
      }

    } catch (modelError: any) {
      console.error(`🔴 [/api/courses] Error during ${queryMethod} operations:`, modelError.message, modelError.stack);
      // Fallback to direct collection find if model fails - though less likely now
      try {
        queryMethod = "Direct Collection (Fallback)";
        console.log('🔄 [/api/courses] Fallback: Attempting direct collection operations');
        
        totalCourses = await mongoose.connection.db.collection('courses').countDocuments(queryOptions);
        console.log(`🟢 [/api/courses] Direct collection('courses').countDocuments(${JSON.stringify(queryOptions)}) successful, count: ${totalCourses}`);
        
        coursesFromQuery = await mongoose.connection.db.collection('courses').find(queryOptions).skip(skip).limit(limit).toArray();
        console.log(`🟢 [/api/courses] ${queryMethod} find successful, courses found: ${coursesFromQuery.length}, skip: ${skip}, limit: ${limit}`);
         if (coursesFromQuery.length > 0) {
            console.log(`🟢 [/api/courses] First course from ${queryMethod} _id:`, JSON.stringify(coursesFromQuery[0]._id));
         }
      } catch (directError: any) {
         console.error(`🔴 [/api/courses] Error during ${queryMethod} (Fallback) operations:`, directError.message, directError.stack);
         return NextResponse.json({
            message: 'Failed to fetch courses from API (Fallback Error).',
            error: directError.message,
        }, { status: 500 });
      }
    }

    const coursesToReturn = coursesFromQuery.map(course => ({
      ...course,
      id: course._id.toString(), 
      _id: course._id.toString(),
      seller: course.seller ? { 
        name: course.seller.name || 'Seller Placeholder', 
        avatarUrl: course.seller.avatarUrl,
        verificationStatus: course.seller.verificationStatus,
        bio: course.seller.bio,
      } : null,
      title: course.title || "Untitled Course",
      category: course.category || "Uncategorized",
      imageUrl: course.imageUrl || "https://placehold.co/600x400.png",
      price: course.price === undefined ? 0 : course.price,
      rating: course.rating === undefined ? 0 : course.rating,
      reviewsCount: course.reviewsCount === undefined ? 0 : course.reviewsCount,
      providerInfo: course.providerInfo || { name: course.instructor || "Unknown Seller" }
    }));

    const totalPages = Math.ceil(totalCourses / limit);

    console.log(`🟢 [/api/courses] Preparing to return ${coursesToReturn.length} courses (Page: ${page}, Limit: ${limit}, TotalPages: ${totalPages}, TotalCourses: ${totalCourses}). Fetched via ${queryMethod}.`);

    return NextResponse.json({
      courses: coursesToReturn,
      totalPages: totalPages,
      currentPage: page,
      totalCourses: totalCourses,
    });

  } catch (error: any) {
    console.error('🔴 Failed to fetch courses (API Route /api/courses/route.ts V4):', error);
    return NextResponse.json({
        message: 'Failed to fetch courses from API (V4).',
        error: error.message,
        errorName: error.name,
        errorCode: error.code,
        fullError: JSON.stringify(error, Object.getOwnPropertyNames(error))
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    if (body.seller && typeof body.seller === 'string') {
        body.seller = new mongoose.Types.ObjectId(body.seller);
    }
    const newCourse = new CourseModel({
      ...body,
      approvalStatus: 'pending', // Default approval status for new courses
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
