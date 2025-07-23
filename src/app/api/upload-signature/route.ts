
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using your environment variables
// This is the correct and only place this configuration should happen.
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;

    if (!paramsToSign) {
        return NextResponse.json({ message: "Parameters to sign are required." }, { status: 400 });
    }
    
    // The api_sign_request method uses the pre-configured secret.
    // We do NOT need to pass the secret here again.
    const signature = cloudinary.utils.api_sign_request(paramsToSign);
    
    return NextResponse.json({ signature });

  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    // It's helpful to log the specific error for debugging
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: "Failed to generate signature", error: errorMessage }, { status: 500 });
  }
}
