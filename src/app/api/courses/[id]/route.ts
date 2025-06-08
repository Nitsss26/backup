
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../../lib/dbConnect'; // Changed to relative path
import CourseModel, { type ICourse } from '@/models/Course';
import mongoose from 'mongoose';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  await dbConnect();
  const { id } = params;

  console.log(`🔵 [/api/courses/[id]] Attempting to fetch course. Received ID: '${id}', type: ${typeof id}`);

  if (!id || typeof id !== 'string') {
    console.error('🔴 [/api/courses/[id]] Course ID is missing, null, undefined, or not a string. Value:', id);
    return NextResponse.json({ message: 'Course ID is required and must be a string.' }, { status: 400 });
  }

  if (id.length < 12 || !/^[0-9a-fA-F]{24}$/.test(id) || !mongoose.Types.ObjectId.isValid(id) ) {
    console.error(`🔴 [/api/courses/[id]] Invalid course ID format: '${id}'. It is not a valid MongoDB ObjectId.`);
    return NextResponse.json({ message: `Invalid course ID format provided: ${id}` }, { status: 400 });
  }

  try {
    console.log(`🔄 [/api/courses/[id]] Attempting CourseModel.findById('${id}') with population`);
    const course = await CourseModel.findById(id)
      .populate('seller', 'name avatarUrl verificationStatus bio') // Simplified populate
      .lean();

    if (!course) {
      console.warn(`🟡 [/api/courses/[id]] Course not found for ID: ${id}`);
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }
    console.log(`🟢 [/api/courses/[id]] Successfully fetched course: ${course.title}`);
    return NextResponse.json(course);
  } catch (error) {
    const err = error as Error;
    console.error(`🔴 [/api/courses/[id]] Failed to fetch course ${id}:`, err);
    // Log the full error object if possible, or specific properties
    console.error(`🔴 [/api/courses/[id]] Full error object:`, JSON.stringify(err, Object.getOwnPropertyNames(err)));
    return NextResponse.json({
      message: 'Failed to fetch course due to a server error.',
      errorName: err.name,
      errorMessage: err.message,
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid course ID format' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const updatedCourse = await CourseModel.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!updatedCourse) {
      return NextResponse.json({ message: 'Course not found for update' }, { status: 404 });
    }
    return NextResponse.json(updatedCourse);
  } catch (error: any) {
    console.error(`Failed to update course ${id}:`, error);
    return NextResponse.json({ message: 'Failed to update course', error: error.message, errors: error.errors }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid course ID format' }, { status: 400 });
  }

  try {
    const deletedCourse = await CourseModel.findByIdAndDelete(id).lean();
    if (!deletedCourse) {
      return NextResponse.json({ message: 'Course not found for deletion' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(`Failed to delete course ${id}:`, error);
    return NextResponse.json({ message: 'Failed to delete course', error: (error as Error).message }, { status: 500 });
  }
}
