
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// This route is now self-contained and does not rely on external .env loading.
export async function POST(request: NextRequest) {
  try {
    const { paramsToSign } = await request.json();

    const cloudName = "dy9kjvyjn";
    const apiKey = "933218122216285";
    const apiSecret = "cFXnb0kkH75Q24ii2_nvj9YY_3s";

    // Explicitly configure Cloudinary with credentials directly inside the handler.
    // This is a surefire way to ensure the config is loaded correctly.
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    if (!cloudName || !apiKey || !apiSecret) {
      console.error('SERVER ERROR: Hardcoded Cloudinary credentials are not set.');
      return NextResponse.json(
        { error: 'Cloudinary server configuration is incomplete.' },
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
