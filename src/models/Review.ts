
import mongoose, { Schema, Document, models, Model } from 'mongoose';
import type { ICourse } from './Course';
import type { IUser } from './User';

export interface IReview extends Document {
  course: mongoose.Types.ObjectId | ICourse;
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
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, trim: true, maxlength: 2000 },
  helpfulVotes: { type: Number, default: 0, min: 0 },
  unhelpfulVotes: { type: Number, default: 0, min: 0 },
  moderationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

ReviewSchema.index({ course: 1, user: 1 }, { unique: true }); // User can review a course only once
ReviewSchema.index({ course: 1, moderationStatus: 1 });

const ReviewModel: Model<IReview> = models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default ReviewModel;
