import mongoose, { Schema, Document } from 'mongoose';

export interface IClickEvent extends Document {
  _id: string;
  sessionId: string;
  elementType: string;
  elementText: string;
  href?: string;
  courseId?: string;
  timestamp: Date;
}

const ClickEventSchema: Schema = new Schema({
  sessionId: { type: String, required: true },
  elementType: { type: String, required: true },
  elementText: { type: String, required: true },
  href: { type: String },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  timestamp: { type: Date, default: Date.now },
});

// Add indexes for analytics
ClickEventSchema.index({ sessionId: 1 });
ClickEventSchema.index({ courseId: 1, timestamp: -1 });

export default mongoose.models.ClickEvent || mongoose.model<IClickEvent>('ClickEvent', ClickEventSchema);