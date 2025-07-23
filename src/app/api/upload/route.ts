import { NextResponse, type NextRequest } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeUpload: async (pathname) => {
        // This is where you can add checks before upload
        return {
          pathname,
          // For example, you can add a user ID to the pathname
          // pathname: `${userId}/${pathname}`,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // This is where you can add logic after upload is complete
        console.log('blob upload completed', blob, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5xx status codes
    );
  }
}
