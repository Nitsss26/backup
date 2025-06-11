
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import type { IVisitEvent } from '@/models/VisitEvent'; // Import the interface

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const { path, userId, sessionId, ipAddress, userAgent } = body;

    if (!path) {
      return NextResponse.json({ message: 'Path is required for visit event' }, { status: 400 });
    }

    const visitEventData: Partial<IVisitEvent> = { // Use Partial for data to be saved
      path,
      sessionId,
      ipAddress, // Note: Collect IP responsibly
      userAgent,
    };
    if (userId) visitEventData.userId = userId; // Add userId if provided

    const newEvent = new VisitEventModel(visitEventData);
    await newEvent.save();
    
    return NextResponse.json({ message: 'Visit event tracked successfully', eventId: newEvent._id }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to track visit event:', error);
    return NextResponse.json({ message: 'Failed to track visit event', error: error.message }, { status: 500 });
  }
}
