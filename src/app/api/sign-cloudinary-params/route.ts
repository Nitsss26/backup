
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Explicitly load environment variables from the root .env file
dotenv.config({ path: '.env' });

export async function POST(request: NextRequest) {
  try {
    const { paramsToSign } = await request.json();

    // Explicitly configure Cloudinary inside the request handler
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !apiKey || !apiSecret) {
      console.error('SERVER ERROR: Missing one or more Cloudinary environment variables.');
      return NextResponse.json(
        { error: 'Cloudinary server configuration is incomplete. Please check server logs.' },
        { status: 500 }
      );
    }
    
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
