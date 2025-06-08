
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CategoryModel from '@/models/Category';

export async function GET() {
  await dbConnect();
  try {
    const categories = await CategoryModel.find({}).sort({ name: 1 }).lean();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json({ message: 'Failed to fetch categories', error: (error as Error).message }, { status: 500 });
  }
}
