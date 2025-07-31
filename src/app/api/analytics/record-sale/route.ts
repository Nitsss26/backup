import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/models/Order';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const { orderId, amount, courseId, timestamp, userId } = await request.json();
    
    if (!orderId || !amount) {
      return NextResponse.json({ error: 'Order ID and amount are required' }, { status: 400 });
    }

    // Check if order already exists to prevent duplicates
    const existingOrder = await OrderModel.findOne({ transactionId: orderId });
    
    if (existingOrder) {
      return NextResponse.json({ message: 'Sale already recorded' });
    }

    // Create new order record
    const newOrder = new OrderModel({
      user: userId ? new mongoose.Types.ObjectId(userId) : new mongoose.Types.ObjectId(), // Use provided userId or generate a dummy one
      items: courseId ? [{
        itemId: courseId,
        itemType: 'course',
        priceAtPurchase: amount,
        titleAtPurchase: `Course ${courseId}`
      }] : [],
      totalAmount: amount,
      paymentMethod: 'online',
      status: 'completed',
      transactionId: orderId,
      orderDate: new Date(timestamp || Date.now()),
    });

    await newOrder.save();

    return NextResponse.json({ message: 'Sale recorded successfully' });
  } catch (error) {
    console.error('Error recording sale:', error);
    return NextResponse.json({ error: 'Failed to record sale' }, { status: 500 });
  }
}