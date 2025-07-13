import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IUser extends Document {
  firebaseUid: string;
  name: string;
  email: string;
  phone?: string; 
  password?: string;
  role: 'student' | 'provider' | 'admin';
  avatarUrl?: string;
  bio?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'unverified';
  documentsSubmitted: boolean;
  notificationPreferences: {
    courseUpdates: boolean;
    promotions: boolean;
    platformAnnouncements: boolean;
  };
  coursesCreated: mongoose.Types.ObjectId[];
  coursesEnrolled: mongoose.Types.ObjectId[];
  wishlist: mongoose.Types.ObjectId[];
  orders: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  firebaseUid: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: [true, 'Name is required.'] },
  email: { 
    type: String, 
    required: [true, 'Email is required.'], 
    unique: true, 
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address.']
  },
  phone: { type: String, trim: true, sparse: true, unique: true }, // Added unique constraint
  password: { type: String, select: false },
  role: { type: String, enum: ['student', 'provider', 'admin'], default: 'student' },
  avatarUrl: { type: String, default: '' },
  bio: { type: String, default: '', maxlength: 500 },
  verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected', 'unverified'], default: 'unverified' },
  documentsSubmitted: { type: Boolean, default: false },
  notificationPreferences: {
    courseUpdates: { type: Boolean, default: true },
    promotions: { type: Boolean, default: false },
    platformAnnouncements: { type: Boolean, default: true },
  },
  coursesCreated: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  coursesEnrolled: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
}, { timestamps: true });

const UserModel: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
