import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import UserModel from '@/models/User';
import OrderModel from '@/models/Order';
import UserActionEvent from '@/models/UserActionEvent';
import mongoose from 'mongoose';

export async function POST() {
  try {
    await dbConnect();
    
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Generate sample visit events
    const visitEvents = [];
    for (let i = 0; i < 50; i++) {
      const randomDate = new Date(sevenDaysAgo.getTime() + Math.random() * (now.getTime() - sevenDaysAgo.getTime()));
      visitEvents.push({
        uniqueUserId: `user_${Math.floor(Math.random() * 20)}`,
        sessionId: `session_${Math.floor(Math.random() * 30)}`,
        device: Math.random() > 0.5 ? 'Desktop' : 'Mobile',
        timestamp: randomDate,
        path: ['/', '/courses', '/about', '/contact'][Math.floor(Math.random() * 4)],
        duration: Math.floor(Math.random() * 300000) + 10000, // 10s to 5min
      });
    }
    
    // Generate sample users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const randomDate = new Date(sevenDaysAgo.getTime() + Math.random() * (now.getTime() - sevenDaysAgo.getTime()));
      users.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        createdAt: randomDate,
      });
    }
    
    // Generate sample orders
    const orders = [];
    for (let i = 0; i < 15; i++) {
      const randomDate = new Date(sevenDaysAgo.getTime() + Math.random() * (now.getTime() - sevenDaysAgo.getTime()));
      orders.push({
        user: new mongoose.Types.ObjectId(),
        items: [{
          itemId: `course_${i}`,
          itemType: 'course',
          priceAtPurchase: Math.floor(Math.random() * 5000) + 1000,
          titleAtPurchase: `Course ${i}`
        }],
        totalAmount: Math.floor(Math.random() * 5000) + 1000,
        paymentMethod: 'online',
        status: 'completed',
        transactionId: `txn_${i}`,
        orderDate: randomDate,
      });
    }
    
    // Generate sample user actions
    const userActions = [];
    for (let i = 0; i < 30; i++) {
      const randomDate = new Date(sevenDaysAgo.getTime() + Math.random() * (now.getTime() - sevenDaysAgo.getTime()));
      userActions.push({
        userId: `user_${Math.floor(Math.random() * 20)}`,
        sessionId: `session_${Math.floor(Math.random() * 30)}`,
        actionType: ['click', 'add_to_cart', 'add_to_wishlist'][Math.floor(Math.random() * 3)],
        timestamp: randomDate,
        details: { page: '/courses' }
      });
    }
    
    // Insert all data
    await Promise.all([
      VisitEventModel.insertMany(visitEvents),
      UserModel.insertMany(users),
      OrderModel.insertMany(orders),
      UserActionEvent.insertMany(userActions)
    ]);
    
    return NextResponse.json({ 
      message: 'Test data created successfully',
      counts: {
        visitEvents: visitEvents.length,
        users: users.length,
        orders: orders.length,
        userActions: userActions.length
      }
    });
  } catch (error) {
    console.error('Error creating test data:', error);
    return NextResponse.json({ error: 'Failed to create test data' }, { status: 500 });
  }
}