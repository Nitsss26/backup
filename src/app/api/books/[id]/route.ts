
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import BookModel from '@/models/Book';
import mongoose from 'mongoose';

interface RouteContext {
  params: {
    id: string;
  };
}

// Handler for updating a single book (e.g., for editing in the future)
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid book ID.' }, { status: 400 });
    }

    const updatedBook = await BookModel.findByIdAndUpdate(id, body, { new: true });

    if (!updatedBook) {
      return NextResponse.json({ message: 'Book not found.' }, { status: 404 });
    }

    return NextResponse.json(updatedBook);
  } catch (error: any) {
    console.error("Failed to update book:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Handler for deleting a single book
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    await dbConnect();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid book ID.' }, { status: 400 });
    }

    const deletedBook = await BookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return NextResponse.json({ message: 'Book not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Book deleted successfully.' });
  } catch (error: any) {
    console.error("Failed to delete book:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
