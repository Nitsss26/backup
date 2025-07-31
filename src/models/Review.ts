
import mongoose, { Schema, Document, models, Model } from 'mongoose';
import './User'; // Ensure User model is registered
import type { IUser } from './User';

export interface IReview extends Document {
  courseId: string; // Changed to string to support both ObjectId and custom EBook IDs
  user: mongoose.Types.ObjectId | IUser;
  rating: number;
  comment: string;
  helpfulVotes: number;
  unhelpfulVotes: number;
  moderationStatus: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema<IReview> = new Schema({
  courseId: { type: String, required: true, index: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, trim: true, maxlength: 2000 },
  helpfulVotes: { type: Number, default: 0, min: 0 },
  unhelpfulVotes: { type: Number, default: 0, min: 0 },
  moderationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

ReviewSchema.index({ courseId: 1, user: 1 }, { unique: true });
ReviewSchema.index({ courseId: 1, moderationStatus: 1 });

const ReviewModel: Model<IReview> = models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default ReviewModel;
