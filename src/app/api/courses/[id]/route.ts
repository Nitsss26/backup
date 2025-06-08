
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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid course ID format' }, { status: 400 });
  }

  try {
    const course = await CourseModel.findById(id)
      .populate('seller', 'name avatarUrl verificationStatus bio providerInfo.websiteUrl')
      .lean(); 
      
    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (error) {
    console.error(`Failed to fetch course ${id}:`, error);
    return NextResponse.json({ message: 'Failed to fetch course', error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid course ID format' }, { status: 400 });
  }

  try {
    // TODO: Add authentication and authorization checks here
    const body = await request.json();
    // TODO: Add robust validation for the body (e.g., using Zod)

    const updatedCourse = await CourseModel.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!updatedCourse) {
      return NextResponse.json({ message: 'Course not found for update' }, { status: 404 });
    }
    return NextResponse.json(updatedCourse);
  } catch (error: any) {
    console.error(`Failed to update course ${id}:`, error);
    // if (error.name === 'ZodError') {
    //   return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    // }
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
    // TODO: Add authentication and authorization checks here
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
