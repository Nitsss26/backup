
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(request: NextRequest) {
  try {
    const { paramsToSign } = await request.json();

    // Directly configure Cloudinary with credentials here to bypass environment loading issues.
    const cloudName = "dy9kjvyjn";
    const apiKey = "933218122216285";
    const apiSecret = "cFXnb0kkH75Q24ii2_nvj9YY_3s";

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    
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
