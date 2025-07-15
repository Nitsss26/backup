
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import type { UserRole } from '@/lib/types';

// This endpoint handles creating or getting a user from MongoDB after Firebase authentication
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, name, role, avatarUrl, firebaseUid, phone } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    let user = await UserModel.findOne({ email });

    if (user) {
      // User exists, update Firebase UID if it's not there, or role if they re-register as a different type.
      if (firebaseUid) user.firebaseUid = firebaseUid;
      if (role) user.role = role;
      if (phone && !user.phone) user.phone = phone; // Add phone if missing
      await user.save();
    } else {
        // If user doesn't exist, we should ideally not create one in a simple login flow.
        // But for the purpose of this simplified system, we will check if it's a known placeholder.
        // For a real app, you would return a "User not found" error here.
        // This logic is being kept to support the initial seeding. A more robust solution
        // would separate user creation (registration) from user fetching (login).
        
        // This block will now effectively act as a fallback for user creation if needed.
        if (!firebaseUid) {
            return NextResponse.json({ message: 'User not found. Please register.' }, { status: 404 });
        }

        const newUserRole: UserRole = role || 'student';
        
        user = await UserModel.create({
            email,
            name: name || email.split('@')[0],
            firebaseUid,
            phone,
            role: newUserRole,
            avatarUrl: avatarUrl || `https://placehold.co/100x100/EBF4FF/3B82F6?text=${(name || email).charAt(0).toUpperCase()}`,
            verificationStatus: newUserRole === 'provider' ? 'unverified' : undefined,
            documentsSubmitted: false,
        });
    }

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Exclude password from the response
    const { password, ...userResponse } = user.toObject();

    return NextResponse.json(userResponse, { status: user ? 200 : 201 });

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
