
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Explicitly configure Cloudinary using individual environment variables
// This is more robust than relying on the single URL.
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;

  try {
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );
    return NextResponse.json({ signature });
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    return NextResponse.json({ message: "Failed to generate signature" }, { status: 500 });
  }
}
