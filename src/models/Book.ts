
import mongoose, { Schema, Document, models, Model } from 'mongoose';

// The IUser interface no longer needs the whatsappNumber, as it will be stored per book listing.
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
}

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
  whatsappNumber: string; // Added field to store number with the book
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
  whatsappNumber: { type: String, required: true, trim: true }, // Added schema definition
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
