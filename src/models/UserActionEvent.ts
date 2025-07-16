import mongoose, { Schema, Document, models, Model } from 'mongoose';

export type UserActionType =
  | 'signup'
  | 'login'
  | 'logout'
  | 'profile_update'
  | 'password_reset_request'
  | 'password_reset_complete'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'view_cart'
  | 'start_checkout'
  | 'order_completed'
  | 'order_failed'
  | 'scroll';

export interface IUserActionEvent extends Document {
  userId?: mongoose.Types.ObjectId;
  sessionId: string;
  courseId?: mongoose.Types.ObjectId;
  actionType: UserActionType;
  timestamp: Date;
  details?: {
    scrollDepth?: number;
    [key: string]: any;
  };
  ipAddress?: string;
  userAgent?: string;
  geoData?: {
    country: string;
    city?: string;
    state?: string;
    lat?: number;
    lng?: number;
  };
  device?: string;
  browser?: string;
  trafficSource?: 'Google' | 'LinkedIn' | 'Instagram' | 'X' | 'YouTube' | 'Facebook' | 'Direct' | 'Other Referral' | 'Unknown';
}

const UserActionEventSchema: Schema<IUserActionEvent> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  sessionId: { type: String, trim: true, index: true, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  actionType: {
    type: String,
    required: true,
    enum: [
      'signup', 'login', 'logout', 'profile_update', 'password_reset_request',
      'password_reset_complete', 'add_to_cart', 'remove_from_cart', 'view_cart',
      'start_checkout', 'order_completed', 'order_failed', 'scroll'
    ]
  },
  timestamp: { type: Date, default: Date.now },
  details: { type: Schema.Types.Mixed },
  ipAddress: { type: String, trim: true },
  userAgent: { type: String, trim: true },
  geoData: {
    country: { type: String },
    city: { type: String },
    state: { type: String },
    lat: { type: Number },
    lng: { type: Number },
  },
  device: { type: String },
  browser: { type: String },
  trafficSource: { type: String, enum: ['Google', 'LinkedIn', 'Instagram', 'X', 'YouTube', 'Facebook', 'Direct', 'Other Referral', 'Unknown'] },
}, { timestamps: { createdAt: 'timestamp', updatedAt: false } });

UserActionEventSchema.index({ timestamp: -1 });
UserActionEventSchema.index({ userId: 1, actionType: 1, timestamp: -1 });

const UserActionEventModel: Model<IUserActionEvent> = models.UserActionEvent || mongoose.model<IUserActionEvent>('UserActionEvent', UserActionEventSchema);

export default UserActionEventModel;
