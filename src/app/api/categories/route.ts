
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect'; // Changed to relative path
import CategoryModel from '@/models/Category';

export async function GET() {
  try {
    await dbConnect();
    const categories = await CategoryModel.find({}).sort({ name: 1 }).lean();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to fetch categories API:', error);
    const err = error as Error;
    return NextResponse.json({ message: 'Failed to fetch categories: ' + err.message, errorName: err.name }, { status: 500 });
  }
}
