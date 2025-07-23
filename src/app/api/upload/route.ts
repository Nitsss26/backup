
import { NextResponse, NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary with credentials from environment variables
cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Helper function to stream buffer to Cloudinary
async function uploadToCloudinary(buffer: Buffer, folder: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'auto'
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );
        
        const readableStream = new Readable();
        readableStream._read = () => {}; // Noop
        readableStream.push(buffer);
        readableStream.push(null);
        
        readableStream.pipe(uploadStream);
    });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No file found in request' }, { status: 400 });
    }

    // Read the file into a buffer
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(buffer, 'edtechcart_books');

    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error('Cloudinary upload failed, no secure URL returned.');
    }

    return NextResponse.json({
      message: 'Upload successful',
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error in upload API:', error);
    return NextResponse.json({
        message: 'Upload failed',
        error: error.message,
    }, { status: 500 });
  }
}
