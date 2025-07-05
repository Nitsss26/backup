
// import mongoose, { Schema, Document, models, Model } from 'mongoose';

// export interface IVisitEvent extends Document {
//   path: string;
//   timestamp: Date;
//   userId?: mongoose.Types.ObjectId; // Optional: if the user is logged in
//   ipAddress?: string; // Consider privacy implications and anonymization
//   userAgent?: string;
//   sessionId?: string; // For tracking user sessions
// }

// const VisitEventSchema: Schema<IVisitEvent> = new Schema({
//   path: { type: String, required: true, trim: true },
//   timestamp: { type: Date, default: Date.now },
//   userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: false }, // Explicitly optional
//   ipAddress: { type: String, trim: true },
//   userAgent: { type: String, trim: true },
//   sessionId: { type: String, trim: true, index: true },
// }, { timestamps: { createdAt: 'timestamp', updatedAt: false } }); // Use timestamp for createdAt

// VisitEventSchema.index({ timestamp: -1 });
// VisitEventSchema.index({ path: 1, timestamp: -1 });

// const VisitEventModel: Model<IVisitEvent> = models.VisitEvent || mongoose.model<IVisitEvent>('VisitEvent', VisitEventSchema);

// export default VisitEventModel;

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
    lon?: number;
    lng?: number;
  };
  device?: string;
  browser?: string;
  trafficSource?: string;
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
    lon: { type: Number },
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

export default models.VisitEvent || model<IVisitEvent>('VisitEvent', VisitEventSchema);