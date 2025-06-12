
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../../lib/dbConnect'; // Changed to relative path
import CourseModel, { type ICourse } from '@/models/Course';
import type { Course } from '@/lib/types'; // Import frontend Course type
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
    console.log(`🔄 [/api/courses/[id]] Attempting CourseModel.findById('${id}').lean()`);
    const courseFromDb = await CourseModel.findById(id).populate('seller', 'name avatarUrl verificationStatus bio').lean(); // Added populate for seller

    if (!courseFromDb) {
      console.warn(`🟡 [/api/courses/[id]] Course not found for ID: ${id}`);
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }
    
    // Map the database model to the frontend Course type
    const courseForFrontend: Course = {
      ...(courseFromDb as any), // Spread raw DB data
      id: courseFromDb._id.toString(), // Ensure 'id' is the string version of '_id'
      _id: courseFromDb._id.toString(), // Also include _id if type expects it or for consistency
      sellerId: courseFromDb.seller?._id?.toString(), // Handle populated seller
      // providerInfo might need mapping if seller object shape differs from providerInfo
      providerInfo: courseFromDb.providerInfo || (courseFromDb.seller ? { 
          name: (courseFromDb.seller as any).name || 'Unknown Seller',
          verified: (courseFromDb.seller as any).verificationStatus === 'verified',
          logoUrl: (courseFromDb.seller as any).avatarUrl,
          description: (courseFromDb.seller as any).bio,
          // type: (courseFromDb.seller as any).role === 'provider' ? ((courseFromDb.seller as any).providerType || 'Individual') : undefined
      } : { name: 'Unknown Seller', verified: false }),
      curriculum: Array.isArray(courseFromDb.curriculum) ? courseFromDb.curriculum.map((mod: any) => ({
        ...mod,
        id: mod._id?.toString() || mod.id, // Ensure module ID is string
        lessons: Array.isArray(mod.lessons) ? mod.lessons.map((lesson: any) => ({
            ...lesson,
            id: lesson._id?.toString() || lesson.id // Ensure lesson ID is string
        })) : []
      })) : [],
      // Ensure all other fields expected by frontend Course type are present
      // If some fields in ICourse don't exactly match Course, map them here
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
