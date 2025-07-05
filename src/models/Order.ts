
// import mongoose, { Schema, Document, models, Model } from 'mongoose';
// import type { ICourse } from './Course'; // Ensure this path is correct
// import type { IUser } from './User'; // Ensure this path is correct

// interface IOrderItem extends Document {
//   course: mongoose.Types.ObjectId | ICourse; 
//   priceAtPurchase: number; 
//   titleAtPurchase: string; 
// }

// const OrderItemSchema: Schema<IOrderItem> = new Schema({
//   course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
//   priceAtPurchase: { type: Number, required: true, min: 0 },
//   titleAtPurchase: { type: String, required: true },
// }, { _id: false });


// export interface IOrder extends Document {
//   user: mongoose.Types.ObjectId | IUser; 
//   items: IOrderItem[];
//   totalAmount: number;
//   paymentMethod: string;
//   status: 'pending' | 'completed' | 'failed' | 'refunded' | 'processing';
//   transactionId?: string; 
//   paymentDetails?: object; 
//   orderDate: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const OrderSchema: Schema<IOrder> = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [OrderItemSchema],
//   totalAmount: { type: Number, required: true, min: 0 },
//   paymentMethod: { type: String, required: true }, 
//   status: { 
//     type: String, 
//     enum: ['pending', 'completed', 'failed', 'refunded', 'processing'], 
//     default: 'pending' 
//   },
//   transactionId: { type: String, index: true },
//   paymentDetails: { type: Schema.Types.Mixed }, 
//   orderDate: { type: Date, default: Date.now },
// }, { timestamps: true });

// OrderSchema.index({ user: 1, orderDate: -1 });

// const OrderModel: Model<IOrder> = models.Order || mongoose.model<IOrder>('Order', OrderSchema);

// export default OrderModel;


import mongoose, { Schema, Document, models, Model } from 'mongoose';
import type { ICourse } from './Course'; // Ensure this path is correct
import type { IUser } from './User'; // Ensure this path is correct

interface IOrderItem extends Document {
  course: mongoose.Types.ObjectId | ICourse; 
  priceAtPurchase: number; 
  titleAtPurchase: string; 
}

const OrderItemSchema: Schema<IOrderItem> = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  priceAtPurchase: { type: Number, required: true, min: 0 },
  titleAtPurchase: { type: String, required: true },
}, { _id: false });


export interface IOrder extends Document {
  user: mongoose.Types.ObjectId | IUser; 
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'processing';
  transactionId?: string; 
  paymentDetails?: object; 
  orderDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, required: true }, 
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed', 'refunded', 'processing'], 
    default: 'pending' 
  },
  transactionId: { type: String, index: true },
  paymentDetails: { type: Schema.Types.Mixed }, 
  orderDate: { type: Date, default: Date.now },
}, { timestamps: true });

OrderSchema.index({ user: 1, orderDate: -1 });

const OrderModel: Model<IOrder> = models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;
