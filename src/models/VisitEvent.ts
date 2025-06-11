
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IVisitEvent extends Document {
  path: string;
  timestamp: Date;
  userId?: mongoose.Types.ObjectId; // Optional: if the user is logged in
  ipAddress?: string; // Consider privacy implications and anonymization
  userAgent?: string;
  sessionId?: string; // For tracking user sessions
}

const VisitEventSchema: Schema<IVisitEvent> = new Schema({
  path: { type: String, required: true, trim: true },
  timestamp: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  ipAddress: { type: String, trim: true },
  userAgent: { type: String, trim: true },
  sessionId: { type: String, trim: true, index: true },
}, { timestamps: { createdAt: 'timestamp', updatedAt: false } }); // Use timestamp for createdAt

VisitEventSchema.index({ timestamp: -1 });
VisitEventSchema.index({ path: 1, timestamp: -1 });

const VisitEventModel: Model<IVisitEvent> = models.VisitEvent || mongoose.model<IVisitEvent>('VisitEvent', VisitEventSchema);

export default VisitEventModel;
