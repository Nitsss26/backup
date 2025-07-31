
import mongoose, { Schema, Document, models, Model } from 'mongoose';
import './User';
import type { IUser } from './User';

// This allows referencing different item details in the same array
const wishlistItemSchema = new Schema({
  itemId: { 
    type: String, 
    required: true,
  },
  itemType: {
    type: String,
    required: true,
    enum: ['course', 'ebook', 'subscription', 'book', 'addon']
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });


export interface IWishlist extends Document {
  userId: mongoose.Types.ObjectId | IUser; // The user who owns this wishlist
  items: {
    itemId: string;
    itemType: string;
    addedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema: Schema<IWishlist> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [wishlistItemSchema],
}, { timestamps: true });

WishlistSchema.index({ userId: 1 });

const WishlistModel: Model<IWishlist> = models.Wishlist || mongoose.model<IWishlist>('Wishlist', WishlistSchema);

export default WishlistModel;
