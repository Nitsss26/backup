
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CourseViewEventModel from '@/models/CourseViewEvent';
import type { ICourseViewEvent } from '@/models/CourseViewEvent'; // Import the interface
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const { courseId, userId, source, sessionId } = body;

    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return NextResponse.json({ message: 'Valid Course ID is required' }, { status: 400 });
    }

    const eventData: Partial<ICourseViewEvent> = { // Use Partial for data to be saved
      courseId: new mongoose.Types.ObjectId(courseId),
      source,
      sessionId,
    };
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      eventData.userId = new mongoose.Types.ObjectId(userId);
    }
    
    const newEvent = new CourseViewEventModel(eventData);
    await newEvent.save();
    
    return NextResponse.json({ message: 'Course view event tracked successfully', eventId: newEvent._id }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to track course view event:', error);
    return NextResponse.json({ message: 'Failed to track course view event', error: error.message }, { status: 500 });
  }
}
