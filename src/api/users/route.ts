
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import type { UserRole } from '@/lib/types';

// This endpoint handles creating or getting a user from MongoDB after Firebase authentication
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    // Find the user by email and explicitly include the password field
    const user = await UserModel.findOne({ email }).select('+password').lean();

    if (!user) {
        return NextResponse.json({ message: 'Invalid credentials. User not found.' }, { status: 404 });
    }

    // Since there's no hashing yet, we do a direct comparison.
    // In a real app, you would use a library like bcrypt to compare hashed passwords.
    const isPasswordCorrect = user.password === password;

    if (!isPasswordCorrect) {
        return NextResponse.json({ message: 'Invalid credentials. Password incorrect.' }, { status: 401 });
    }

    // Exclude password from the final response
    const { password: _, ...userResponse } = user;

    return NextResponse.json(userResponse, { status: 200 });

  } catch (error: any) {
    console.error('[API /api/users POST] Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
