
import mongoose, { Schema, Document, models, Model } from 'mongoose';
import type { IUser } from './User'; // For seller type reference

interface ILesson extends Document {
  title: string;
  type: 'video' | 'pdf' | 'quiz' | 'text' | 'assignment';
  duration?: string;
  contentUrl?: string;
  textContent?: string;
  order: number;
  isFreePreview: boolean;
}

const LessonSchema: Schema<ILesson> = new Schema({
  title: { type: String, required: true, trim: true },
  type: { type: String, enum: ['video', 'pdf', 'quiz', 'text', 'assignment'], required: true },
  duration: { type: String },
  contentUrl: { type: String, trim: true }, // URL for video, PDF
  textContent: { type: String }, // For text-based lessons
  order: { type: Number, required: true },
  isFreePreview: { type: Boolean, default: false },
}, { _id: true }); // Use _id for subdocuments by default, or set to false if not needed as separate ID

interface IModule extends Document {
  title: string;
  lessons: ILesson[];
  order: number;
}

const ModuleSchema: Schema<IModule> = new Schema({
  title: { type: String, required: true, trim: true },
  lessons: [LessonSchema],
  order: { type: Number, required: true },
}, { _id: true });


export interface IProviderInfo {
  name: string;
  logoUrl?: string;
  verified?: boolean;
  description?: string;
  websiteUrl?: string;
  type?: 'Individual' | 'Institute' | 'Coaching Center' | 'Verified Educator';
}

const ProviderInfoSchema: Schema<IProviderInfo> = new Schema({
  name: { type: String, required: true },
  logoUrl: { type: String },
  verified: { type: Boolean, default: false },
  description: { type: String },
  websiteUrl: { type: String },
  type: { type: String, enum: ['Individual', 'Institute', 'Coaching Center', 'Verified Educator'] },
}, { _id: false });


export interface ICourse extends Document {
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  language: string;
  duration?: string;
  imageUrl?: string;
  demoVideoUrl?: string;
  certificateAvailable: boolean;
  highlights: string[];
  curriculum: IModule[];
  seller: mongoose.Types.ObjectId | IUser; // Reference to User model (seller)
  studentsEnrolledCount: number;
  rating: number;
  reviewsCount: number;
  tags?: string[];
  approvalStatus: 'pending' | 'approved' | 'rejected';
  moneyBackGuaranteeDays?: number;
  freeTrialAvailable: boolean;
  downloadableMaterialsDescription?: string;
  detailedScheduleDescription?: string;
  providerInfo?: IProviderInfo; // Denormalized for quicker display
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema<ICourse> = new Schema({
  title: { type: String, required: true, trim: true },
  shortDescription: { type: String, required: true, trim: true, maxlength: 250 },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, min: 0 },
  category: { type: String, required: true }, // Could be ObjectId ref if categories are a separate collection
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'], required: true },
  language: { type: String, required: true },
  duration: { type: String },
  imageUrl: { type: String, trim: true },
  demoVideoUrl: { type: String, trim: true },
  certificateAvailable: { type: Boolean, default: false },
  highlights: [{ type: String }],
  curriculum: [ModuleSchema],
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  studentsEnrolledCount: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewsCount: { type: Number, default: 0, min: 0 },
  tags: [{ type: String, trim: true, lowercase: true }],
  approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  moneyBackGuaranteeDays: { type: Number, default: 0, min: 0 },
  freeTrialAvailable: { type: Boolean, default: false },
  downloadableMaterialsDescription: { type: String, maxlength: 500 },
  detailedScheduleDescription: { type: String, maxlength: 1000 },
  providerInfo: ProviderInfoSchema,
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

// Corrected text index definition
CourseSchema.index(
  { title: 'text', description: 'text', tags: 'text' }, // Fields to include in the text index
  { default_language: 'english' } // Specify default language for the index
);

const CourseModel: Model<ICourse> = models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default CourseModel;
