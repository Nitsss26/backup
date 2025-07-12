
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import type { UserRole } from '@/lib/types';

// This endpoint handles creating or getting a user from MongoDB after Firebase authentication
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, name, role, avatarUrl, firebaseUid } = body;

    if (!email || !firebaseUid) {
      return NextResponse.json({ message: 'Email and Firebase UID are required.' }, { status: 400 });
    }

    let user = await UserModel.findOne({ email });

    if (user) {
      // User exists, update Firebase UID if it's not there
      if (!user.firebaseUid) {
        user.firebaseUid = firebaseUid;
        await user.save();
      }
    } else {
      // User does not exist, create a new one
      const newUserRole: UserRole = role || 'student';
      
      user = await UserModel.create({
        email,
        name: name || email.split('@')[0],
        firebaseUid,
        role: newUserRole,
        avatarUrl: avatarUrl || `https://placehold.co/100x100/EBF4FF/3B82F6?text=${(name || email).charAt(0).toUpperCase()}`,
        verificationStatus: newUserRole === 'provider' ? 'unverified' : undefined,
        documentsSubmitted: false,
      });
    }

    // Don't send back the password hash
    const { password, ...userResponse } = user.toObject();

    return NextResponse.json(userResponse, { status: user ? 200 : 201 });

  } catch (error: any) {
    console.error('[API /api/users POST] Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
