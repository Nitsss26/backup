
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import BookModel from '@/models/Book';
import mongoose from 'mongoose';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    await dbConnect();
    const { id } = params;
    const { status } = await request.json();

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ message: 'Invalid status provided.' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid book ID.' }, { status: 400 });
    }

    const updatedBook = await BookModel.findByIdAndUpdate(
      id,
      { approvalStatus: status },
      { new: true }
    );

    if (!updatedBook) {
      return NextResponse.json({ message: 'Book not found.' }, { status: 404 });
    }

    return NextResponse.json(updatedBook);
  } catch (error: any) {
    console.error("Failed to update book status:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
