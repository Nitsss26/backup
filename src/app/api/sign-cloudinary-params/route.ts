import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Explicitly load environment variables from the root .env file
dotenv.config({ path: '.env' });

// Configure Cloudinary with the credentials from environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { paramsToSign } = await request.json();

    // Validate environment variables on each request to be certain
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error('SERVER ERROR: Missing one or more Cloudinary environment variables (CLOUD_NAME, API_KEY, API_SECRET).');
      return NextResponse.json(
        { error: 'Cloudinary server configuration is incomplete. Please check server logs.' },
        { status: 500 }
      );
    }

    // Generate the signature
    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

    return NextResponse.json({ signature });

  } catch (error: any) {
    console.error('Error signing Cloudinary params:', error);
    return NextResponse.json(
      { error: 'Failed to sign upload parameters', details: error.message },
      { status: 500 }
    );
  }
}
