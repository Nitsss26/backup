
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = "book-covers";
  
  try {
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: folder
      },
      process.env.CLOUDINARY_API_SECRET!
    );
    
    return NextResponse.json({ signature, timestamp, folder });
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    return NextResponse.json({ message: "Failed to generate signature" }, { status: 500 });
  }
}
