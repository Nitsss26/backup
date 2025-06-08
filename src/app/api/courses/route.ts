
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import CourseModel from '../../../models/Course';
import { ITEMS_PER_PAGE } from '../../../lib/constants';

interface ApiResponse {
  courses: any[];
  totalPages: number;
  currentPage: number;
  totalCourses: number;
}

export async function GET(request: NextRequest) {
  console.log('🟢 [/api/courses] GET request received - SIMPLIFIED');
  
  try {
    await dbConnect();
    console.log('🟢 [/api/courses] MongoDB connected successfully.');

    const courses = await CourseModel.find({})
      .populate('seller', 'name avatarUrl verificationStatus')
      .lean();
    console.log('🟢 [/api/courses] CourseModel.find({}) successful, courses found:', courses.length);

    const totalCourses = courses.length; // Simplified total

    return NextResponse.json({
      courses,
      totalPages: 1, // Simplified for debugging
      currentPage: 1, // Simplified for debugging
      totalCourses,
    });

  } catch (error: any) {
    console.error('🔴 Failed to fetch courses (API Route /api/courses/route.ts - SIMPLIFIED):', error);
    console.error('🔴 Error Name:', error.name);
    console.error('🔴 Error Message:', error.message);
    console.error('🔴 Error Stack:', error.stack);
    console.error('🔴 Error Code (if any):', error.code);
    console.error('🔴 Full Error Object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    
    return NextResponse.json({
        message: 'Failed to fetch courses from API (Simplified).',
        error: error.message,
        errorName: error.name,
        errorStack: error.stack,
        errorCode: error.code,
        fullError: JSON.stringify(error, Object.getOwnPropertyNames(error)) // Attempt to serialize full error
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    // TODO: Add authentication and authorization checks here
    const body = await request.json();
    // TODO: Add robust validation for the body (e.g., using Zod)
    
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
