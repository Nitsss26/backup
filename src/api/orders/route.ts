

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
    if (typeof totalAmount !== 'number' || totalAmount < 0) { // Allow 0 for free items
      return NextResponse.json({ message: 'Valid total amount is required' }, { status: 400 });
    }
    if (!paymentMethod) {
      return NextResponse.json({ message: 'Payment method is required' }, { status: 400 });
    }

    const orderItems = items.map((cartItem: CartItem) => {
      const item = cartItem.item;
      const uniqueItemId = item.id || item._id;

      if (!uniqueItemId) {
        throw new Error(`Item missing ID in order payload`);
      }
       if (cartItem.type === 'course' && !mongoose.Types.ObjectId.isValid(uniqueItemId)) {
         throw new Error(`Invalid course ID found in order items: ${uniqueItemId}`);
      }
      return {
        itemId: uniqueItemId,
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
      status: 'completed', // Mark as completed for this flow
      paymentDetails: paymentDetails || {}, 
      orderDate: new Date(),
    });

    const savedOrder = await newOrder.save();
    
    // Add order to user's order history
    await UserModel.findByIdAndUpdate(userId, { $addToSet: { orders: savedOrder._id } });

    // Enroll user in courses
    const courseIdsToEnroll = items
        .filter((item: CartItem) => item.type === 'course')
        .map((item: CartItem) => new mongoose.Types.ObjectId(item.item.id || item.item._id));
    
    if (courseIdsToEnroll.length > 0) {
        await UserModel.findByIdAndUpdate(userId, { $addToSet: { coursesEnrolled: { $each: courseIdsToEnroll } } });
        // Increment studentsEnrolledCount for each course
        await CourseModel.updateMany(
            { _id: { $in: courseIdsToEnroll } },
            { $inc: { studentsEnrolledCount: 1, studentsEnrolled: 1 } }
        );
    }
    
    const savedOrderObject = savedOrder.toObject();
    savedOrderObject.id = savedOrder._id.toString();
    
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
