
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserActionEventModel from '@/models/UserActionEvent';
import type { IUserActionEvent, UserActionType } from '@/models/UserActionEvent'; // Import the interface and type
import mongoose from 'mongoose';

const VALID_ACTION_TYPES: UserActionType[] = ['signup', 'login', 'logout', 'profile_update', 'password_reset_request', 'password_reset_complete', 'add_to_cart', 'remove_from_cart', 'view_cart', 'start_checkout', 'order_completed', 'order_failed'];

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const { userId, actionType, details, sessionId, ipAddress, userAgent } = body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: 'Valid User ID is required' }, { status: 400 });
    }
    if (!actionType || !VALID_ACTION_TYPES.includes(actionType as UserActionType)) {
      return NextResponse.json({ message: 'Valid Action Type is required' }, { status: 400 });
    }

    const eventData: Partial<IUserActionEvent> = { // Use Partial for data to be saved
      userId: new mongoose.Types.ObjectId(userId),
      actionType: actionType as UserActionType,
      details,
      sessionId,
      ipAddress,
      userAgent,
    };
    
    const newEvent = new UserActionEventModel(eventData);
    await newEvent.save();
    
    return NextResponse.json({ message: 'User action event tracked successfully', eventId: newEvent._id }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to track user action event:', error);
    return NextResponse.json({ message: 'Failed to track user action event', error: error.message }, { status: 500 });
  }
}
