
import mongoose, { Schema, Document, model, models, Model } from 'mongoose';
import './User'; // Ensure User model is registered

export interface IVisitEvent extends Document {
  _id: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId | null;
  sessionId: string;
  uniqueUserId: string; // Added field for persistent user tracking
  path: string;
  url?: string; // Full URL with query parameters
  courseId?: mongoose.Types.ObjectId;
  timestamp: Date;
  duration: number; // Changed from optional
  geoData?: {
    country: string;
    city?: string;
    state?: string;
    lat: number;
    lng: number;
  };
  device?: string;
  browser?: string;
  userAgent?: string;
  trafficSource?: string;
  utmSource?: string; // UTM source parameter
  utmMedium?: string; // UTM medium parameter
  utmCampaign?: string; // UTM campaign parameter
}

const VisitEventSchema: Schema<IVisitEvent> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  sessionId: { type: String, required: true },
  uniqueUserId: { type: String, required: true, index: true }, // Added field
  path: { type: String, required: true },
  url: { type: String }, // Full URL with query parameters
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', default: null },
  timestamp: { type: Date, required: true, default: Date.now },
  duration: { type: Number, default: 0, required: true },
  geoData: {
    country: { type: String, default: 'unknown' },
    city: { type: String, default: 'unknown' },
    state: { type: String, default: 'unknown' },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },
  device: { type: String },
  browser: { type: String },
  userAgent: { type: String },
  trafficSource: { type: String },
  utmSource: { type: String }, // UTM source parameter
  utmMedium: { type: String }, // UTM medium parameter
  utmCampaign: { type: String }, // UTM campaign parameter
});

VisitEventSchema.index({ sessionId: 1, path: 1, timestamp: -1 });
VisitEventSchema.index({ courseId: 1, timestamp: -1 });
VisitEventSchema.index({ path: 1, timestamp: -1 });
VisitEventSchema.index({ trafficSource: 1, timestamp: -1 });
VisitEventSchema.index({ uniqueUserId: 1, timestamp: -1 }); // Index for fast unique user lookup
VisitEventSchema.index({ utmSource: 1, timestamp: -1 }); // Index for UTM source tracking
VisitEventSchema.index({ utmMedium: 1, timestamp: -1 }); // Index for UTM medium tracking

const VisitEventModel: Model<IVisitEvent> = models.VisitEvent || model<IVisitEvent>('VisitEvent', VisitEventSchema);

export default VisitEventModel;
