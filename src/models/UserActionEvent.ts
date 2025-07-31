
import mongoose, { Schema, Document, models, Model } from 'mongoose';
import './User'; // Ensure User model is registered

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
  | 'scroll'
  | 'click'
  | 'add_to_wishlist'; // Added wishlist action

export interface IUserActionEvent extends Document {
  userId?: mongoose.Types.ObjectId;
  sessionId: string;
  courseId?: mongoose.Types.ObjectId;
  actionType: UserActionType;
  timestamp: Date;
  details: {
    path: string;
    elementType?: string;
    elementText?: string;
    href?: string;
    section?: string; // To track which part of the page was clicked
    scrollDepth?: number;
    itemId?: string;
    itemType?: string;
    itemTitle?: string;
    [key: string]: any;
  };
  geoData?: {
    country: string;
    city?: string;
    state?: string;
    lat?: number;
    lng?: number;
  };
  device?: string;
  browser?: string;
  trafficSource?: string;
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
      'start_checkout', 'order_completed', 'order_failed', 'scroll', 'click',
      'add_to_wishlist'
    ]
  },
  timestamp: { type: Date, default: Date.now },
  details: { 
    type: new Schema({
      path: { type: String },
      elementType: { type: String },
      elementText: { type: String },
      href: { type: String },
      section: { type: String },
      scrollDepth: { type: Number },
      itemId: { type: String },
      itemType: { type: String },
      itemTitle: { type: String },
    }, {_id: false})
   },
  geoData: {
    country: { type: String },
    city: { type: String },
    state: { type: String },
    lat: { type: Number },
    lng: { type: Number },
  },
  device: { type: String },
  browser: { type: String },
  trafficSource: { type: String },
}, { timestamps: { createdAt: 'timestamp', updatedAt: false } });

UserActionEventSchema.index({ timestamp: -1 });
UserActionEventSchema.index({ userId: 1, actionType: 1, timestamp: -1 });
UserActionEventSchema.index({ 'details.path': 1, timestamp: -1 });
UserActionEventSchema.index({ 'details.elementText': 1, timestamp: -1 });
UserActionEventSchema.index({ 'details.section': 1 });


const UserActionEventModel: Model<IUserActionEvent> = models.UserActionEvent || mongoose.model<IUserActionEvent>('UserActionEvent', UserActionEventSchema);
export default UserActionEventModel;
