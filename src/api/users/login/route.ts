
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

    const lowerCaseEmail = email.toLowerCase();

    // Special case for the hardcoded admin
    if (lowerCaseEmail === 'admin@example.com') {
      if (password !== '123456') {
        return NextResponse.json({ message: 'Invalid admin credentials.' }, { status: 401 });
      }
      
      let adminUser = await UserModel.findOne({ email: lowerCaseEmail }).lean();

      // If admin user doesn't exist, create one
      if (!adminUser) {
        adminUser = await new UserModel({
          name: 'Admin User',
          email: lowerCaseEmail,
          role: 'admin',
          password: 'password_not_stored_for_special_case', // Should be hashed in a real app
          verificationStatus: 'verified',
        }).save();
      }
      
      const { password: _, ...adminResponse } = adminUser;
      return NextResponse.json({ ...adminResponse, id: adminUser._id.toString() }, { status: 200 });
    }

    // Special case for the hardcoded seller
    if (lowerCaseEmail === 'kaushik.learning@example.com') {
      if (password !== 'password123') {
        return NextResponse.json({ message: 'Invalid credentials for seller.' }, { status: 401 });
      }
      // Find the seller but don't check the password in the general way
      const seller = await UserModel.findOne({ email: lowerCaseEmail }).lean();
      if (!seller) {
        // Optionally create the seller if they don't exist
        return NextResponse.json({ message: 'Seller account not found.' }, { status: 404 });
      }
      const { password: _, ...sellerResponse } = seller;
      return NextResponse.json({ ...sellerResponse, id: seller._id.toString() }, { status: 200 });
    }

    // General user login
    const user = await UserModel.findOne({ email: lowerCaseEmail }).select('+password');

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // This is a placeholder for password comparison. In a real app, use bcrypt.compare
    const isPasswordMatch = user.password === password;

    if (!isPasswordMatch) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }
    
    const { password: _, ...userResponse } = user.toObject();

    return NextResponse.json({ ...userResponse, id: user._id.toString() }, { status: 200 });

  } catch (error: any) {
    console.error('[API LOGIN] Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
