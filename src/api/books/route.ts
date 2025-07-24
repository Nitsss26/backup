
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import BookModel, { IBook } from '@/models/Book';
import mongoose from 'mongoose';
import UserModel from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.category || !data.subcategory || !data.listingType || !data.imageUrl || !data.whatsappNumber || !data.sellerId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Validate pricing based on listing type
    if (data.listingType === 'sell' && (!data.price || data.price <= 0)) {
      return NextResponse.json({ message: "Valid price is required for selling" }, { status: 400 });
    }

    if (data.listingType === 'rent' && (!data.rentPricePerMonth || data.rentPricePerMonth <= 0)) {
      return NextResponse.json({ message: "Valid rent price is required for renting" }, { status: 400 });
    }

    // Validate location
    if (!data.location || !data.location.coordinates || !data.location.address) {
      return NextResponse.json({ message: "Location is required" }, { status: 400 });
    }

    // Create the book document
    const bookData: Partial<IBook> = {
      title: data.title.trim(),
      author: data.author?.trim() || '',
      category: data.category,
      subcategory: data.subcategory,
      listingType: data.listingType,
      imageUrl: data.imageUrl,
      seller: new mongoose.Types.ObjectId(data.sellerId),
      location: {
        type: 'Point',
        coordinates: data.location.coordinates,
        address: data.location.address
      },
      approvalStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add price based on listing type
    if (data.listingType === 'sell') {
      bookData.price = Number(data.price);
    } else if (data.listingType === 'rent') {
      bookData.rentPricePerMonth = Number(data.rentPricePerMonth);
    }
    
    // Update seller's whatsapp number if it's different
    await UserModel.findByIdAndUpdate(data.sellerId, { whatsappNumber: data.whatsappNumber });


    const newBook = new BookModel(bookData);
    await newBook.save();

    return NextResponse.json({ 
      message: "Book listing created successfully",
      book: newBook 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Failed to create book listing:", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({ 
        message: "Validation failed", 
        errors: validationErrors 
      }, { status: 400 });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json({ 
        message: "A book with similar details already exists" 
      }, { status: 409 });
    }

    return NextResponse.json({ 
      message: error.message || "Failed to create book listing" 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const sellerId = searchParams.get('sellerId');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const query: any = {};

    // Filter by status
    if (status === 'all') {
      // No status filter for admin - shows all books
    } else if (sellerId) {
      // Show all books for a specific seller
      query.seller = new mongoose.Types.ObjectId(sellerId);
    } else {
      // Default: only show approved books
      query.approvalStatus = 'approved';
    }

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { subcategory: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await BookModel.countDocuments(query);

    // Fetch books with pagination
    const books = await BookModel.find(query)
      .populate('seller', 'name email whatsappNumber')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({ 
      books,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error: any) {
    console.error("Failed to fetch books:", error);
    return NextResponse.json({ 
      message: error.message || "Failed to fetch books" 
    }, { status: 500 });
  }
}

