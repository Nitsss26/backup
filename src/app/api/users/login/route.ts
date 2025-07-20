
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import type { User } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // This is a placeholder for password comparison. In a real app, use bcrypt.compare
    const isPasswordMatch = user.password === password;

    if (!isPasswordMatch) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }
    
    // Hardcoded check for the specific seller
    if (email.toLowerCase() === 'kaushik.learning@example.com') {
      if (password !== 'password123') {
         return NextResponse.json({ message: 'Invalid credentials for seller.' }, { status: 401 });
      }
      user.role = 'provider'; // Ensure role is correct
    }


    const { password: _, ...userResponse } = user.toObject();

    return NextResponse.json(userResponse, { status: 200 });

  } catch (error: any) {
    console.error('[API LOGIN] Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
