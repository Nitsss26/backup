
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CourseViewEventModel from '@/models/CourseViewEvent';
import type { ICourseViewEvent } from '@/models/CourseViewEvent'; 
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { courseId, userId, source, sessionId } = body;

    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return NextResponse.json({ message: 'Valid Course ID is required' }, { status: 400 });
    }

    const eventData: Partial<ICourseViewEvent> = {
      courseId: new mongoose.Types.ObjectId(courseId),
      source,
      sessionId,
    };

    if (userId) {
      if (mongoose.Types.ObjectId.isValid(userId)) {
        eventData.userId = new mongoose.Types.ObjectId(userId);
      } else {
        console.warn(`[API /api/track/course-view] Invalid userId format: ${userId}. Tracking event without user ID.`);
      }
    }
    
    const newEvent = new CourseViewEventModel(eventData);
    await newEvent.save();
    
    return NextResponse.json({ message: 'Course view event tracked successfully', eventId: newEvent._id }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to track course view event:', error);
    // Return a 202 to indicate the request was accepted but processing might have an issue,
    // or a 500 if it's critical. For tracking, often non-critical, so 202 might be okay.
    // For now, let's stick to 500 for consistency if DB fails.
    return NextResponse.json({ message: 'Failed to track course view event: ' + error.message }, { status: 500 });
  }
}
