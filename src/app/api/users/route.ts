
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import type { UserRole } from '@/lib/types';

// This endpoint handles creating a new user in MongoDB.
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, password, name } = body;

    // --- Validation ---
    if (!email || !password || !name) {
      return NextResponse.json({ message: 'Name, email, and password are required.' }, { status: 400 });
    }
    
    // --- Check if user already exists ---
    const existingUser = await UserModel.findOne({ email }).lean();
    if (existingUser) {
        return NextResponse.json({ message: 'An account with this email already exists.' }, { status: 409 });
    }

    // --- Create New User (as student by default) ---
    const newUser = new UserModel({
      name,
      email,
      password, // In a real app, this should be hashed.
      role: 'student', // All new signups are students
      verificationStatus: 'unverified',
      documentsSubmitted: false,
      notificationPreferences: {
        courseUpdates: true,
        promotions: true,
        platformAnnouncements: true,
      },
    });

    await newUser.save();
    
    // Exclude password from the final response before sending it to the client
    const { password: _, ...userResponse } = newUser.toObject();

    return NextResponse.json(userResponse, { status: 201 });

  } catch (error: any) {
    console.error('[API /api/users POST - SIGNUP] Error:', error);
    if (error.name === 'ValidationError') {
        return NextResponse.json({ message: 'Validation Error', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
