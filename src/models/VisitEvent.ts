
import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IVisitEvent extends Document {
  _id: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId | null;
  sessionId: string;
  path: string;
  courseId?: mongoose.Types.ObjectId;
  timestamp: Date;
  duration?: number;
  geoData?: {
    country: string;
    city?: string;
    state?: string;
    lat: number;
    lng: number;
  };
  device?: string;
  browser?: string;
  trafficSource?: string; // Changed to flexible string for UTM sources
  type: 'visit';
}

const VisitEventSchema: Schema<IVisitEvent> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  sessionId: { type: String, required: true },
  path: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', default: null },
  timestamp: { type: Date, required: true, default: Date.now },
  duration: { type: Number, default: 0 },
  geoData: {
    country: { type: String, default: 'unknown' },
    city: { type: String, default: 'unknown' },
    state: { type: String, default: 'unknown' },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },
  device: { type: String },
  browser: { type: String },
  trafficSource: { type: String },
  type: { type: String, enum: ['visit'], required: true },
});

// Add indexes for analytics
VisitEventSchema.index({ sessionId: 1, path: 1, duration: 1 });
VisitEventSchema.index({ courseId: 1, timestamp: -1 });
VisitEventSchema.index({ path: 1, timestamp: -1 });
VisitEventSchema.index({ trafficSource: 1, timestamp: -1 }); // Index for traffic source analytics

export default models.VisitEvent || model<IVisitEvent>('VisitEvent', VisitEventSchema);
