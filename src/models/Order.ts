

import mongoose, { Schema, Document, models, Model } from 'mongoose';
import type { IUser } from './User';

// This allows referencing different models in the same field
const orderItemSchema = new Schema({
  itemId: { // Store ID as string to accommodate both ObjectId and custom strings
    type: String, 
    required: true,
  },
  itemType: {
    type: String,
    required: true,
    enum: ['course', 'ebook'] // The possible models (lowercase to match CartItem)
  },
  priceAtPurchase: {
    type: Number,
    required: true,
    min: 0
  },
  titleAtPurchase: {
    type: String,
    required: true
  },
}, { _id: false });

export interface IOrderItem extends Document {
  itemId: string; // Changed to string
  itemType: 'course' | 'ebook';
  priceAtPurchase: number;
  titleAtPurchase: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId | IUser;
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paymentDetails?: object;
  orderDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: { type: String, index: true },
  paymentDetails: { type: Schema.Types.Mixed },
  orderDate: { type: Date, default: Date.now },
}, { timestamps: true });

OrderSchema.index({ user: 1, orderDate: -1 });

const OrderModel: Model<IOrder> = models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;
