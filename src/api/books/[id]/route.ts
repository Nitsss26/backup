
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import BookModel from '@/models/Book';
import mongoose from 'mongoose';

interface RouteContext {
  params: {
    id: string;
  };
}

// Handler for fetching a single book
export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    await dbConnect();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid book ID.' }, { status: 400 });
    }

    const book = await BookModel.findById(id).populate('seller', 'name email');
    if (!book) {
      return NextResponse.json({ message: 'Book not found.' }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error: any) {
    console.error("Failed to fetch book:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


// Handler for updating a single book
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid book ID.' }, { status: 400 });
    }

    // Only allow updating specific fields
    const { title, price, rentPricePerMonth, whatsappNumber } = body;
    const updateData: any = {};
    if (title) updateData.title = title;
    if (price !== undefined) updateData.price = price;
    if (rentPricePerMonth !== undefined) updateData.rentPricePerMonth = rentPricePerMonth;
    if (whatsappNumber) updateData.whatsappNumber = whatsappNumber;

    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ message: 'No valid fields provided for update.' }, { status: 400 });
    }

    const updatedBook = await BookModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

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
