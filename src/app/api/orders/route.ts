

import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import OrderModel, { type IOrder } from '@/models/Order';
import UserModel from '@/models/User'; 
import CourseModel, {type ICourse} from '@/models/Course';
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
      const item = cartItem.item as Course | EBook;
      if (!item.id || !mongoose.Types.ObjectId.isValid(item.id)) {
        throw new Error(`Invalid item ID found in order items: ${item.id}`);
      }
      return {
        item: new mongoose.Types.ObjectId(item.id),
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
    savedOrderObject.items = savedOrder.items.map(item => ({
        ...item,
        item: item.item.toString() 
    }));


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

    const orders = await OrderModel.find({ user: new mongoose.Types.ObjectId(userId) })
      .populate({
        path: 'items.item',
        model: 'Course', // This will need to be adjusted if you have separate EBook model
      })
      .sort({ orderDate: -1 })
      .lean();
      
    const transformedOrders = orders.map(order => ({
        ...order,
        id: order._id.toString(), 
        items: order.items.map(item => {
            const courseOrEbook = item.item as any; // Cast to any to access properties
            return {
                ...item,
                id: courseOrEbook?._id?.toString() || courseOrEbook?.id?.toString() || null, 
                title: courseOrEbook?.title || item.titleAtPurchase, 
                imageUrl: courseOrEbook?.imageUrl || 'https://placehold.co/100x56.png', 
                category: courseOrEbook?.category || 'N/A',
            };
        })
    }));

    return NextResponse.json(transformedOrders);

  } catch (error: any) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ message: 'Failed to fetch orders: ' + error.message }, { status: 500 });
  }
}
