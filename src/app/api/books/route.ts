
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import BookModel from '@/models/Book';
import UserModel from '@/models/User';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();

    const newBook = new BookModel({
      ...data,
      seller: new mongoose.Types.ObjectId(data.sellerId),
      approvalStatus: 'pending' 
    });

    await newBook.save();
    return NextResponse.json(newBook, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create book listing:", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const sellerId = searchParams.get('sellerId');

    const query: any = {};

    if (status === 'all') {
      // no status filter for admin
    } else if (sellerId) {
      query.seller = new mongoose.Types.ObjectId(sellerId);
    }
    else {
      query.approvalStatus = 'approved';
    }

    const books = await BookModel.find(query)
      .populate({
        path: 'seller',
        model: UserModel,
        select: 'name email whatsappNumber',
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({ books });
  } catch (error: any) {
    console.error("Failed to fetch books:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
