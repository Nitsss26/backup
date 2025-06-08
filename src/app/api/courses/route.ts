
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import CourseModel from '../../../models/Course';
import { ITEMS_PER_PAGE } from '../../../lib/constants';
import mongoose from 'mongoose'; // Import mongoose for direct db access

interface ApiResponse {
  courses: any[]; // Using any[] for now as direct fetch won't be typed as ICourse immediately
  totalPages: number;
  currentPage: number;
  totalCourses: number;
}

export async function GET(request: NextRequest) {
  console.log('🟢 [/api/courses] GET request received - SIMPLIFIED + DIRECT FETCH TEST');
  
  try {
    await dbConnect();
    console.log('🟢 [/api/courses] MongoDB connected successfully.');
    console.log('🟢 [/api/courses] MongoDB Connection ReadyState:', mongoose.connection.readyState);

    if (CourseModel && CourseModel.collection) {
        console.log('🟢 [/api/courses] CourseModel is configured to use collection:', CourseModel.collection.name);
    } else {
        console.log('🔴 [/api/courses] CourseModel or CourseModel.collection is undefined!');
    }

    // Original attempt with Mongoose model
    let coursesFromModel = [];
    try {
        console.log('🔄 [/api/courses] Attempting CourseModel.find({})');
        coursesFromModel = await CourseModel.find({})
                                        .populate('seller', 'name avatarUrl verificationStatus')
                                        .lean();
        console.log('🟢 [/api/courses] CourseModel.find({}) successful, courses found via model:', coursesFromModel.length);
    } catch (modelError: any) {
        console.error('🔴 [/api/courses] Error during CourseModel.find({}):', modelError.message, modelError.stack);
        // Continue to try direct find
    }

    // New attempt with direct collection find
    console.log('🔄 [/api/courses] Attempting direct collection find on "courses"...');
    const directCourses = await mongoose.connection.db.collection('courses').find({}).toArray();
    console.log('🟢 [/api/courses] Direct collection find successful, courses found directly:', directCourses.length);

    // Prepare courses for response (using direct fetch for now)
    // Basic mapping, ideally you'd re-integrate population if this works and you stick with it
    const coursesToReturn = directCourses.map(course => ({
        ...course,
        id: course._id.toString(), // Ensure _id is stringified
        _id: course._id.toString(),
        // Placeholder for seller population if needed
        // seller: course.seller ? { name: 'Seller Name Placeholder', avatarUrl: '', verificationStatus: 'unverified' } : null
    }));

    const totalCourses = directCourses.length;

    console.log(`🟢 [/api/courses] Preparing to return ${totalCourses} courses from direct fetch.`);

    return NextResponse.json({
      courses: coursesToReturn,
      totalPages: totalCourses > 0 ? Math.ceil(totalCourses / ITEMS_PER_PAGE) : 1, // Adjust if using direct
      currentPage: 1, // Adjust if using direct
      totalCourses,
    });

  } catch (error: any) {
    console.error('🔴 Failed to fetch courses (API Route /api/courses/route.ts - SIMPLIFIED + DIRECT FETCH TEST):', error);
    console.error('🔴 Error Name:', error.name);
    console.error('🔴 Error Message:', error.message);
    console.error('🔴 Error Code (if any):', error.code);
    console.error('🔴 Error Stack:', error.stack);
    // Attempt to stringify the full error object if it's not too complex
    try {
      console.error('🔴 Full Error Object (stringified):', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } catch (stringifyError) {
      console.error('🔴 Could not stringify full error object:', stringifyError);
    }
    
    return NextResponse.json({
        message: 'Failed to fetch courses from API (Simplified + Direct Fetch Test).',
        error: error.message,
        errorName: error.name,
        errorStack: error.stack,
        errorCode: error.code,
        fullErrorString: String(error) // Basic string representation
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const newCourse = new CourseModel({
      ...body,
      approvalStatus: 'pending', 
    });
    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: any) {
    console.error('🔴 Failed to create course (API Route /api/courses/route.ts POST):', error);
    return NextResponse.json({ message: 'Failed to create course', error: error.message, details: error.stack }, { status: 400 });
  }
}
