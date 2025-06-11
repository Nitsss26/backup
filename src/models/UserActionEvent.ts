
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export type UserActionType = 'signup' | 'login' | 'logout' | 'profile_update' | 'password_reset_request' | 'password_reset_complete' | 'add_to_cart' | 'remove_from_cart' | 'view_cart' | 'start_checkout' | 'order_completed' | 'order_failed';

export interface IUserActionEvent extends Document {
  userId: mongoose.Types.ObjectId;
  actionType: UserActionType;
  timestamp: Date;
  details?: mongoose.Schema.Types.Mixed; // For additional context, e.g., courseId for cart actions
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
}

const UserActionEventSchema: Schema<IUserActionEvent> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  actionType: { 
    type: String, 
    required: true, 
    enum: ['signup', 'login', 'logout', 'profile_update', 'password_reset_request', 'password_reset_complete', 'add_to_cart', 'remove_from_cart', 'view_cart', 'start_checkout', 'order_completed', 'order_failed'] 
  },
  timestamp: { type: Date, default: Date.now },
  details: { type: Schema.Types.Mixed },
  ipAddress: { type: String, trim: true },
  userAgent: { type: String, trim: true },
  sessionId: { type: String, trim: true, index: true },
}, { timestamps: { createdAt: 'timestamp', updatedAt: false } });

UserActionEventSchema.index({ timestamp: -1 });
UserActionEventSchema.index({ userId: 1, actionType: 1, timestamp: -1 });

const UserActionEventModel: Model<IUserActionEvent> = models.UserActionEvent || mongoose.model<IUserActionEvent>('UserActionEvent', UserActionEventSchema);

export default UserActionEventModel;
