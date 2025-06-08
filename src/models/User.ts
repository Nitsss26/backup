
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional because we might not fetch it always
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
  name: { type: String, required: [true, 'Name is required.'] },
  email: { 
    type: String, 
    required: [true, 'Email is required.'], 
    unique: true, 
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address.']
  },
  password: { type: String, required: [true, 'Password is required.'], select: false }, // select: false means it won't be returned by default
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

// TODO: Add pre-save hook for password hashing in a real application
// UserSchema.pre<IUser>('save', async function(next) {
//   if (!this.isModified('password') || !this.password) {
//     return next();
//   }
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error: any) {
//     next(error);
//   }
// });

const UserModel: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
