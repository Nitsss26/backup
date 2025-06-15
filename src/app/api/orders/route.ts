
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import OrderModel, { type IOrder } from '@/models/Order';
import UserModel from '@/models/User'; // For populating user details in GET
import CourseModel, {type ICourse} from '@/models/Course'; // For populating course details in GET
import mongoose from 'mongoose';

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

    const orderItems = items.map((item: Course) => { // Assuming items from client are Course objects
      if (!item.id || !mongoose.Types.ObjectId.isValid(item.id)) {
        throw new Error(`Invalid course ID found in order items: ${item.id}`);
      }
      return {
        course: new mongoose.Types.ObjectId(item.id),
        priceAtPurchase: item.price, // Assuming price on Course object is the priceAtPurchase
        titleAtPurchase: item.title, // Assuming title on Course object is the titleAtPurchase
      };
    });

    const newOrder = new OrderModel({
      user: new mongoose.Types.ObjectId(userId),
      items: orderItems,
      totalAmount,
      paymentMethod,
      status: 'completed', // Assuming payment is processed successfully client-side or by gateway before this
      paymentDetails: paymentDetails || {}, // Store any payment gateway response
      orderDate: new Date(),
    });

    const savedOrder = await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, { $addToSet: { orders: savedOrder._id } });

    return NextResponse.json(savedOrder, { status: 201 });

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
        path: 'items.course',
        model: CourseModel, 
        select: 'title imageUrl category id _id' 
      })
      .sort({ orderDate: -1 })
      .lean();
      
    const transformedOrders = orders.map(order => ({
        ...order,
        id: order._id.toString(), 
        items: order.items.map(item => {
            const course = item.course as unknown as ICourse; 
            return {
                ...item,
                id: course?._id?.toString() || (course as any)?.id?.toString() || null, 
                title: course?.title || item.titleAtPurchase, 
                imageUrl: course?.imageUrl || 'https://placehold.co/100x56.png', 
                category: course?.category || 'N/A',
            };
        })
    }));

    return NextResponse.json(transformedOrders);

  } catch (error: any) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ message: 'Failed to fetch orders: ' + error.message }, { status: 500 });
  }
}
