
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import type { IVisitEvent } from '@/models/VisitEvent'; // Import the interface
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { path, userId, sessionId, ipAddress, userAgent } = body;

    if (!path) {
      return NextResponse.json({ message: 'Path is required for visit event' }, { status: 400 });
    }

    const visitEventData: Partial<IVisitEvent> = {
      path,
      sessionId,
      ipAddress, 
      userAgent,
    };

    if (userId) {
      if (mongoose.Types.ObjectId.isValid(userId)) {
        visitEventData.userId = new mongoose.Types.ObjectId(userId);
      } else {
        console.warn(`[API /api/track/visit] Invalid userId format: ${userId}. Tracking event without user ID.`);
      }
    }
    
    const newEvent = new VisitEventModel(visitEventData);
    await newEvent.save();
    
    return NextResponse.json({ message: 'Visit event tracked successfully', eventId: newEvent._id }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to track visit event:', error);
    return NextResponse.json({ message: 'Failed to track visit event: ' + error.message }, { status: 500 });
  }
}
