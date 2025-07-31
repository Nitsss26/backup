import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../../lib/dbConnect'; // Adjusted relative path
import CourseModel, { type ICourse } from '@/models/Course';
import type { Course } from '@/lib/types'; // Import frontend Course type
import mongoose from 'mongoose';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  console.log(`🔵 [/api/courses/[id]] Attempting to fetch course. Received ID: '${id}', type: ${typeof id}`);

  try {
    await dbConnect();

    if (!id || typeof id !== 'string') {
      console.error('🔴 [/api/courses/[id]] Course ID is missing, null, undefined, or not a string. Value:', id);
      return NextResponse.json({ message: 'Course ID is required and must be a string.' }, { status: 400 });
    }

    if (id.length < 12 || !/^[0-9a-fA-F]{24}$/.test(id) || !mongoose.Types.ObjectId.isValid(id)) {
      console.error(`🔴 [/api/courses/[id]] Invalid course ID format: '${id}'. It is not a valid MongoDB ObjectId.`);
      return NextResponse.json({ message: `Invalid course ID format provided: ${id}` }, { status: 400 });
    }

    console.log(`🔄 [/api/courses/[id]] Attempting CourseModel.findById('${id}').lean()`);
    const courseFromDb = await CourseModel.findById(id).populate('seller', 'name avatarUrl verificationStatus bio').lean();

    if (!courseFromDb) {
      console.warn(`🟡 [/api/courses/[id]] Course not found for ID: ${id}`);
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    const courseForFrontend: Course = {
      ...(courseFromDb as any),
      id: courseFromDb._id.toString(),
      _id: courseFromDb._id.toString(),
      sellerId: courseFromDb.seller?._id?.toString(),
      providerInfo: courseFromDb.providerInfo || (courseFromDb.seller ? {
        name: (courseFromDb.seller as any).name || 'Unknown Seller',
        verified: (courseFromDb.seller as any).verificationStatus === 'verified',
        logoUrl: (courseFromDb.seller as any).avatarUrl,
        description: (courseFromDb.seller as any).bio,
      } : { name: 'Unknown Seller', verified: false }),
      curriculum: Array.isArray(courseFromDb.curriculum) ? courseFromDb.curriculum.map((mod: any) => ({
        ...mod,
        id: mod._id?.toString() || mod.id,
        lessons: Array.isArray(mod.lessons) ? mod.lessons.map((lesson: any) => ({
          ...lesson,
          id: lesson._id?.toString() || lesson.id
        })) : []
      })) : [],
      instructor: (courseFromDb.seller as any)?.name || courseFromDb.instructor || courseFromDb.providerInfo?.name || 'Instructor N/A',
      shortDescription: courseFromDb.shortDescription || "No short description available.",
      studentsEnrolledCount: courseFromDb.studentsEnrolledCount || 0,
      reviewsCount: courseFromDb.reviewsCount || 0,
      imageUrl: courseFromDb.imageUrl || "https://placehold.co/600x400.png",
      lastUpdated: courseFromDb.lastUpdated ? new Date(courseFromDb.lastUpdated).toISOString() : new Date().toISOString(),
      certificateAvailable: courseFromDb.certificateAvailable || false,
      highlights: courseFromDb.highlights || [],
      price: courseFromDb.price || 0,
      rating: courseFromDb.rating || 0,
      level: courseFromDb.level || 'All Levels',
      language: courseFromDb.language || 'English',
    };

    console.log(`🟢 [/api/courses/[id]] Successfully fetched and mapped course: ${courseForFrontend.title}`);
    return NextResponse.json(courseForFrontend);

  } catch (error) {
    const err = error as Error;
    console.error(`🔴 [/api/courses/[id]] Failed to fetch course ${id}:`, err);
    console.error(`🔴 [/api/courses/[id]] Full error object:`, JSON.stringify(err, Object.getOwnPropertyNames(err)));
    return NextResponse.json({
      message: 'Failed to fetch course due to a server error.',
      errorName: err.name,
      errorMessage: err.message,
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid course ID format' }, { status: 400 });
    }

    const body = await request.json();
    const updatedCourse = await CourseModel.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!updatedCourse) {
      return NextResponse.json({ message: 'Course not found for update' }, { status: 404 });
    }
    const courseForFrontend: Course = {
      ...(updatedCourse as any),
      id: updatedCourse._id.toString(),
      _id: updatedCourse._id.toString(),
      sellerId: updatedCourse.seller?._id?.toString(),
      instructor: (updatedCourse.seller as any)?.name || updatedCourse.instructor || updatedCourse.providerInfo?.name || 'Instructor N/A',
      shortDescription: updatedCourse.shortDescription || "No short description available.",
      studentsEnrolledCount: updatedCourse.studentsEnrolledCount || 0,
      reviewsCount: updatedCourse.reviewsCount || 0,
      imageUrl: updatedCourse.imageUrl || "https://placehold.co/600x400.png",
      lastUpdated: updatedCourse.lastUpdated ? new Date(updatedCourse.lastUpdated).toISOString() : new Date().toISOString(),
      certificateAvailable: updatedCourse.certificateAvailable || false,
      highlights: updatedCourse.highlights || [],
      price: updatedCourse.price || 0,
      rating: updatedCourse.rating || 0,
      level: updatedCourse.level || 'All Levels',
      language: updatedCourse.language || 'English',
      curriculum: Array.isArray(updatedCourse.curriculum) ? updatedCourse.curriculum.map((mod: any) => ({
        ...mod,
        id: mod._id?.toString() || mod.id,
        lessons: Array.isArray(mod.lessons) ? mod.lessons.map((lesson: any) => ({
          ...lesson,
          id: lesson._id?.toString() || lesson.id
        })) : []
      })) : [],
    };
    return NextResponse.json(courseForFrontend);
  } catch (error: any) {
    console.error(`Failed to update course ${id}:`, error);
    return NextResponse.json({ message: 'Failed to update course: ' + error.message, errors: error.errors }, { status: error.name === 'ValidationError' ? 400 : 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid course ID format' }, { status: 400 });
    }

    const deletedCourse = await CourseModel.findByIdAndDelete(id).lean();
    if (!deletedCourse) {
      return NextResponse.json({ message: 'Course not found for deletion' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(`Failed to delete course ${id}:`, error);
    return NextResponse.json({ message: 'Failed to delete course: ' + (error as Error).message }, { status: 500 });
  }
}