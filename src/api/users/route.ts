import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import type { UserRole } from '@/lib/types';

// This endpoint handles creating a user OR logging in a user from MongoDB.
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, password } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ message: 'Password is required for login.' }, { status: 400 });
    }

    // Attempt to find the user by email, and explicitly include the password field for comparison
    const user = await UserModel.findOne({ email }).select('+password').lean();

    if (!user) {
        return NextResponse.json({ message: 'Invalid credentials. User not found.' }, { status: 404 });
    }
    
    // Simple password comparison (as it's not hashed in placeholder data)
    const isPasswordCorrect = user.password === password;

    if (!isPasswordCorrect) {
        return NextResponse.json({ message: 'Invalid credentials. Password incorrect.' }, { status: 401 });
    }

    // Exclude password from the final response before sending it to the client
    const { password: _, ...userResponse } = user;
    return NextResponse.json(userResponse, { status: 200 });

  } catch (error: any) {
    console.error('[API /api/users POST] Error:', error);
    if (error.code === 11000) {
        return NextResponse.json({ message: 'An account with this email already exists.' }, { status: 409 });
    }
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
