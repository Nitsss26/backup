import mongoose, { Schema, Document, Model, models } from 'mongoose';

// Note: This model is DEPRECATED in favor of the more generic UserActionEvent model.
// It is kept for historical data migration purposes but should not be used for new event tracking.

export interface IClickEvent extends Document {
  _id: string;
  sessionId: string;
  elementType: string;
  elementText: string;
  href?: string;
  courseId?: mongoose.Types.ObjectId;
  timestamp: Date;
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
  type: 'click';
}

const ClickEventSchema: Schema = new Schema({
  sessionId: { type: String, required: true },
  elementType: { type: String, required: true },
  elementText: { type: String, required: true },
  href: { type: String },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  timestamp: { type: Date, default: Date.now },
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
  type: { type: String, enum: ['click'], required: true },
});

ClickEventSchema.index({ sessionId: 1 });
ClickEventSchema.index({ courseId: 1, timestamp: -1 });

const ClickEventModel: Model<IClickEvent> = models.ClickEvent || mongoose.model<IClickEvent>('ClickEvent', ClickEventSchema);
export default ClickEventModel;
