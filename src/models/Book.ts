
import mongoose, { Schema, Document, models, Model } from 'mongoose';
import './User'; // Ensure the User model is registered before referencing it
import type { IUser } from './User';

export interface IBook extends Document {
  title: string;
  author?: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  listingType: 'sell' | 'rent';
  price?: number;
  rentPricePerMonth?: number;
  seller: IUser; 
  whatsappNumber: string; 
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
    address: string;
  };
  approvalStatus: 'pending' | 'approved' | 'rejected';
  distance?: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema<IBook> = new Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, trim: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  imageUrl: { type: String, required: true, trim: true },
  listingType: { type: String, enum: ['sell', 'rent'], required: true },
  price: { type: Number, min: 0 },
  rentPricePerMonth: { type: Number, min: 0 },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  whatsappNumber: { type: String, required: true, trim: true }, 
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
    address: { type: String, required: true, trim: true },
  },
  approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

BookSchema.index({ location: '2dsphere' });
BookSchema.index({ approvalStatus: 1, category: 1, subcategory: 1 });
BookSchema.index({ seller: 1 });

const BookModel: Model<IBook> = models.Book || mongoose.model<IBook>('Book', BookSchema);

export default BookModel;
