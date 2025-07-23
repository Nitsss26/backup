
// import { NextResponse, type NextRequest } from 'next/server';
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   // The API key is not required for backend configuration for signing
// });

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { paramsToSign } = body;

//     if (!paramsToSign) {
//       return NextResponse.json({ message: 'Parameters to sign are required.' }, { status: 400 });
//     }

//     const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET!);

//     return NextResponse.json({ signature });

//   } catch (error: any) {
//     console.error("Failed to sign Cloudinary params:", error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { paramsToSign } = await request.json();

    // Validate environment variables
    if (!process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing CLOUDINARY_API_SECRET');
      return NextResponse.json(
        { error: 'Cloudinary configuration missing' },
        { status: 500 }
      );
    }

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      console.error('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
      return NextResponse.json(
        { error: 'Cloudinary configuration missing' },
        { status: 500 }
      );
    }

    if (!process.env.CLOUDINARY_API_KEY) {
      console.error('Missing CLOUDINARY_API_KEY');
      return NextResponse.json(
        { error: 'Cloudinary configuration missing' },
        { status: 500 }
      );
    }

    // Generate the signature
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({ 
      signature,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      timestamp: paramsToSign.timestamp
    });

  } catch (error) {
    console.error('Error signing Cloudinary params:', error);
    return NextResponse.json(
      { error: 'Failed to sign upload parameters' },
      { status: 500 }
    );
  }
}