import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { paramsToSign } = await request.json();

    // Validate environment variables on each request
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiKey) {
      console.error('SERVER ERROR: Missing CLOUDINARY_API_KEY');
      return NextResponse.json(
        { error: 'Cloudinary API Key is missing on the server.' },
        { status: 500 }
      );
    }
     if (!apiSecret) {
      console.error('SERVER ERROR: Missing CLOUDINARY_API_SECRET');
      return NextResponse.json(
        { error: 'Cloudinary API Secret is missing on the server.' },
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
