
import { NextResponse, type NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // The API key is not required for backend configuration for signing
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;

    if (!paramsToSign) {
      return NextResponse.json({ message: 'Parameters to sign are required.' }, { status: 400 });
    }

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET!);

    return NextResponse.json({ signature });

  } catch (error: any) {
    console.error("Failed to sign Cloudinary params:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
