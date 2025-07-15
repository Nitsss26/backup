
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import type { UserRole } from '@/lib/types';

// This endpoint handles creating a user OR logging in a user from MongoDB.
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, password, name, role, avatarUrl, firebaseUid, phone } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    // Attempt to find the user by email
    const user = await UserModel.findOne({ email }).select('+password').lean();

    if (user) {
      // USER EXISTS - THIS IS A LOGIN ATTEMPT
      if (!password) {
        return NextResponse.json({ message: 'Password is required for login.' }, { status: 400 });
      }
      
      const isPasswordCorrect = user.password === password;

      if (!isPasswordCorrect) {
          return NextResponse.json({ message: 'Invalid credentials. Password incorrect.' }, { status: 401 });
      }

      // Exclude password from the final response
      const { password: _, ...userResponse } = user;
      return NextResponse.json(userResponse, { status: 200 });

    } else {
      // USER DOES NOT EXIST - THIS IS A REGISTRATION ATTEMPT
      // For registration, name and role should be provided. We'll stick to a simple login for now.
      // If we were to support registration here, we would check for name, role etc.
      // and create a new user. But since the request is to fix login, we'll focus on that.
      // If the user is not found during a login attempt, it's an error.
       return NextResponse.json({ message: 'Invalid credentials. User not found.' }, { status: 404 });
    }

  } catch (error: any) {
    console.error('[API /api/users POST] Error:', error);
    if (error.code === 11000) {
        return NextResponse.json({ message: 'An account with this email or UID already exists.' }, { status: 409 });
    }
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
