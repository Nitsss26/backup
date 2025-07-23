
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configuration is now done using the CLOUDINARY_URL from .env
cloudinary.config(true); // Passing true initializes from process.env.CLOUDINARY_URL

export async function POST(request: Request) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = "book-covers";
  
  try {
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: folder,
      },
      process.env.CLOUDINARY_API_SECRET!
    );
    
    return NextResponse.json({ signature, timestamp, folder });
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    return NextResponse.json({ message: "Failed to generate signature" }, { status: 500 });
  }
}
