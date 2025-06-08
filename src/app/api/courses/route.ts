
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import CourseModel from '../../../models/Course';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic'; // Ensure no caching on this route

export async function GET(request: NextRequest) {
  console.log('🟢 [/api/courses] GET request received - V3 with CountDocuments');
  try {
    console.log('🟡 [/api/courses] Attempting dbConnect...');
    await dbConnect();
    console.log('🟢 [/api/courses] MongoDB connected successfully. ReadyState:', mongoose.connection.readyState);
    const dbName = mongoose.connection.db.databaseName;
    console.log('🟢 [/api/courses] Current DB Name:', dbName);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('🟢 [/api/courses] Collections in current DB:', JSON.stringify(collections.map(c => c.name)));

    let modelCourseCount = -1;
    try {
      modelCourseCount = await CourseModel.countDocuments({});
      console.log(`🟢 [/api/courses] CourseModel.countDocuments({}) successful, count: ${modelCourseCount}`);
    } catch (countError: any) {
      console.error(`🔴 [/api/courses] Error during CourseModel.countDocuments({}):`, countError.message, countError.stack);
    }

    let directCourseCount = -1;
    try {
      directCourseCount = await mongoose.connection.db.collection('courses').countDocuments({});
      console.log(`🟢 [/api/courses] Direct collection('courses').countDocuments({}) successful, count: ${directCourseCount}`);
    } catch (directCountError: any) {
      console.error(`🔴 [/api/courses] Error during direct collection('courses').countDocuments({}):`, directCountError.message, directCountError.stack);
    }

    if (directCourseCount === 0 && modelCourseCount === 0) {
        console.warn('⚠️ [/api/courses] Both model and direct count are 0. Fetching will likely return empty.');
    }

    let coursesFromQuery: any[] = [];
    let queryMethod = "None";

    try {
      console.log('🔄 [/api/courses] Attempting direct collection find({}).limit(5).toArray()');
      coursesFromQuery = await mongoose.connection.db.collection('courses').find({}).limit(5).toArray();
      queryMethod = "Direct Collection";
      console.log(`🟢 [/api/courses] ${queryMethod} find successful, courses found:`, coursesFromQuery.length);
      if (coursesFromQuery.length > 0) {
        console.log(`🟢 [/api/courses] First course from ${queryMethod} _id:`, JSON.stringify(coursesFromQuery[0]._id));
      }
    } catch (directError: any) {
      console.error(`🔴 [/api/courses] Error during ${queryMethod} find:`, directError.message, directError.stack);
      // Fallback to model find if direct fails, though unlikely if count was also an issue
      try {
        console.log('🔄 [/api/courses] Fallback: Attempting CourseModel.find({}).limit(5).lean()');
        coursesFromQuery = await CourseModel.find({}).limit(5).lean();
        queryMethod = "Mongoose Model (Fallback)";
        console.log(`🟢 [/api/courses] ${queryMethod} find successful, courses found:`, coursesFromQuery.length);
         if (coursesFromQuery.length > 0) {
            console.log(`🟢 [/api/courses] First course from ${queryMethod} _id:`, JSON.stringify(coursesFromQuery[0]._id));
         }
      } catch (modelError: any) {
         console.error(`🔴 [/api/courses] Error during ${queryMethod} (Fallback) find:`, modelError.message, modelError.stack);
      }
    }

    const coursesToReturn = coursesFromQuery.map(course => ({
      ...course,
      id: course._id.toString(), // Ensure 'id' is the stringified '_id'
      _id: course._id.toString(),
      // Minimal seller info for this test
      seller: course.seller ? { name: 'Seller Placeholder' } : null,
      // Ensure essential fields for CourseCard are present or defaulted if not in direct find
      title: course.title || "Untitled Course",
      category: course.category || "Uncategorized",
      imageUrl: course.imageUrl || "https://placehold.co/600x400.png",
      price: course.price === undefined ? 0 : course.price,
      rating: course.rating === undefined ? 0 : course.rating,
      reviewsCount: course.reviewsCount === undefined ? 0 : course.reviewsCount,
      providerInfo: course.providerInfo || { name: course.instructor || "Unknown Seller" }
    }));

    const totalCoursesFromQuery = coursesToReturn.length; // For this test, this is just the count of what we fetched (max 5)

    console.log(`🟢 [/api/courses] Preparing to return ${totalCoursesFromQuery} courses (fetched via ${queryMethod}). Model count: ${modelCourseCount}, Direct count: ${directCourseCount}.`);

    // For debugging, let's use the direct count if it's higher, otherwise model count, or 0.
    const reportedTotal = Math.max(modelCourseCount, directCourseCount, 0);

    return NextResponse.json({
      courses: coursesToReturn,
      totalPages: reportedTotal > 0 ? Math.ceil(reportedTotal / (Number(request.nextUrl.searchParams.get('limit')) || 5 )) : 0, // Use a limit for totalPages calculation
      currentPage: 1, // Simplified for this test
      totalCourses: reportedTotal,
    });

  } catch (error: any) {
    console.error('🔴 Failed to fetch courses (API Route /api/courses/route.ts V3):', error);
    return NextResponse.json({
        message: 'Failed to fetch courses from API (V3).',
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
