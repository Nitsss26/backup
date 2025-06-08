
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect'; // Relative path
import CourseModel from '../../../models/Course'; // Relative path
import { ITEMS_PER_PAGE } from '../../../lib/constants';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  console.log('🟢 [/api/courses] GET request received - EXTREMELY SIMPLIFIED V2');
  try {
    console.log('🟡 [/api/courses] Attempting dbConnect...');
    await dbConnect();
    console.log('🟢 [/api/courses] MongoDB connected successfully. ReadyState:', mongoose.connection.readyState);
    console.log('🟢 [/api/courses] Current DB Name:', mongoose.connection.db.databaseName);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('🟢 [/api/courses] Collections in current DB:', JSON.stringify(collections.map(c => c.name)));

    let coursesFromQuery: any[] = [];
    let queryMethod = "None";

    // Attempt 1: Fetch with Mongoose Model
    try {
      console.log('🔄 [/api/courses] Attempting CourseModel.find({}).limit(5).lean()');
      coursesFromQuery = await CourseModel.find({}).limit(5).lean();
      queryMethod = "Mongoose Model";
      console.log(`🟢 [/api/courses] ${queryMethod} find successful, courses found:`, coursesFromQuery.length);
      if (coursesFromQuery.length > 0) {
        console.log(`🟢 [/api/courses] First course from ${queryMethod}:`, JSON.stringify(coursesFromQuery[0]._id));
      }
    } catch (modelError: any) {
      console.error(`🔴 [/api/courses] Error during ${queryMethod} find:`, modelError.message, modelError.stack);
    }

    // Attempt 2: If model returned 0 or errored, try direct collection find
    if (coursesFromQuery.length === 0) {
      console.warn(`⚠️ [/api/courses] ${queryMethod} returned 0 courses or errored. Attempting direct collection find...`);
      try {
        queryMethod = "Direct Collection";
        coursesFromQuery = await mongoose.connection.db.collection('courses').find({}).limit(5).toArray();
        console.log(`🟢 [/api/courses] ${queryMethod} find successful, courses found:`, coursesFromQuery.length);
        if (coursesFromQuery.length > 0) {
            console.log(`🟢 [/api/courses] First course from ${queryMethod}:`, JSON.stringify(coursesFromQuery[0]._id));
        }
      } catch (directError: any) {
        console.error(`🔴 [/api/courses] Error during ${queryMethod} find:`, directError.message, directError.stack);
        // If direct find also fails, coursesFromQuery remains empty or from model attempt
      }
    }

    // Map to ensure 'id' field is present from '_id'
    const coursesToReturn = coursesFromQuery.map(course => ({
        ...course,
        id: course._id.toString(), // Ensure 'id' is the stringified '_id'
        _id: course._id.toString(), // Keep '_id' as well if needed elsewhere
        // Minimal seller info for this test
        seller: course.seller ? { name: 'Seller Placeholder' } : null
    }));

    const totalCourses = coursesToReturn.length; // For this test, this is just the count of what we fetched (max 5)

    console.log(`🟢 [/api/courses] Preparing to return ${totalCourses} courses (fetched via ${queryMethod}).`);

    return NextResponse.json({
      courses: coursesToReturn,
      totalPages: totalCourses > 0 ? 1 : 0, // Simplified for this test
      currentPage: 1,
      totalCourses: totalCourses, // This would be incorrect for full pagination but fine for testing the fetch
    });

  } catch (error: any) {
    console.error('🔴 Failed to fetch courses (API Route /api/courses/route.ts - EXTREMELY SIMPLIFIED V2):', error);
    console.error('🔴 Error Name:', error.name);
    console.error('🔴 Error Message:', error.message);
    return NextResponse.json({
        message: 'Failed to fetch courses from API (Extremely Simplified V2).',
        error: error.message,
        errorName: error.name,
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    // Ensure seller is an ObjectId if provided
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
    // Check for Zod validation errors (if you were to add Zod)
    // if (error.name === 'ZodError') {
    //   return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    // }
    // Check for Mongoose validation errors
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
