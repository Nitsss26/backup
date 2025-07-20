

import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import OrderModel from '@/models/Order';
import UserModel from '@/models/User'; 
import CourseModel from '@/models/Course';
import { placeholderEBooks } from '@/lib/ebook-placeholder-data';
import mongoose from 'mongoose';
import type { CartItem, Course, EBook } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { userId, items, totalAmount, paymentMethod, paymentDetails } = body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: 'Valid User ID is required' }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: 'Order must contain at least one item' }, { status: 400 });
    }
    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
      return NextResponse.json({ message: 'Valid total amount is required' }, { status: 400 });
    }
    if (!paymentMethod) {
      return NextResponse.json({ message: 'Payment method is required' }, { status: 400 });
    }

    const orderItems = items.map((cartItem: CartItem) => {
      const item = cartItem.item;
      // For E-Books, the ID is not a mongo ObjectId, so we don't validate it here.
      // We assume Courses have valid ObjectIds.
      if (cartItem.type === 'course' && (!item.id || !mongoose.Types.ObjectId.isValid(item.id))) {
         throw new Error(`Invalid course ID found in order items: ${item.id}`);
      }
      return {
        // We will store the string ID for E-Books and ObjectId for Courses
        itemId: item.id,
        itemType: cartItem.type,
        priceAtPurchase: item.price,
        titleAtPurchase: item.title,
      };
    });

    const newOrder = new OrderModel({
      user: new mongoose.Types.ObjectId(userId),
      items: orderItems,
      totalAmount,
      paymentMethod,
      status: 'completed',
      paymentDetails: paymentDetails || {}, 
      orderDate: new Date(),
    });

    const savedOrder = await newOrder.save();
    
    // Convert to a plain object to send back to client, ensuring IDs are strings
    const savedOrderObject = savedOrder.toObject();
    savedOrderObject.id = savedOrder._id.toString();

    // Since itemId is a string, no conversion is needed for the items array.
    
    await UserModel.findByIdAndUpdate(userId, { $addToSet: { orders: savedOrder._id } });

    return NextResponse.json(savedOrderObject, { status: 201 });

  } catch (error: any) {
    console.error('Failed to create order:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation failed: ' + error.message, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to create order: ' + error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: 'Valid User ID query parameter is required' }, { status: 400 });
    }

    const orders = await OrderModel.find({ user: new mongoose.Types.ObjectId(userId) }).sort({ orderDate: -1 }).lean();

    // We can't use populate directly because of mixed types without a common ref.
    // We'll hydrate the items manually.
    const courseIds = orders.flatMap(o => o.items)
                            .filter(i => i.itemType === 'course' && mongoose.Types.ObjectId.isValid(i.itemId))
                            .map(i => new mongoose.Types.ObjectId(i.itemId));

    const courses = await CourseModel.find({ _id: { $in: courseIds } }).lean();
    const courseMap = new Map(courses.map(c => [c._id.toString(), c]));
    const ebookMap = new Map(placeholderEBooks.map(e => [e.id, e]));
      
    const transformedOrders = orders.map(order => ({
        ...order,
        id: order._id.toString(), 
        user: order.user.toString(),
        items: order.items.map(item => {
            let fullItem: Course | EBook | null = null;
            if (item.itemType === 'course') {
                fullItem = courseMap.get(item.itemId) || null;
            } else if (item.itemType === 'ebook') {
                fullItem = ebookMap.get(item.itemId) || null;
            }

            return {
                ...item,
                item: fullItem ? {
                    id: fullItem.id || fullItem._id?.toString(),
                    title: fullItem.title,
                    imageUrl: fullItem.imageUrl,
                    category: fullItem.category,
                    price: fullItem.price,
                } : { // Fallback if item not found
                    id: item.itemId,
                    title: item.titleAtPurchase,
                    imageUrl: 'https://placehold.co/100x56.png',
                    category: 'N/A',
                    price: item.priceAtPurchase
                }
            };
        })
    }));

    return NextResponse.json(transformedOrders);

  } catch (error: any) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ message: 'Failed to fetch orders: ' + error.message }, { status: 500 });
  }
}
