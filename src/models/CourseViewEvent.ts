
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface ICourseViewEvent extends Document {
  courseId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId; // Optional: if the user is logged in
  timestamp: Date;
  source?: string; // e.g., 'course_listing', 'direct_link', 'recommendation'
  sessionId?: string;
}

const CourseViewEventSchema: Schema<ICourseViewEvent> = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  timestamp: { type: Date, default: Date.now },
  source: { type: String, trim: true },
  sessionId: { type: String, trim: true, index: true },
}, { timestamps: { createdAt: 'timestamp', updatedAt: false } });

CourseViewEventSchema.index({ timestamp: -1 });
CourseViewEventSchema.index({ courseId: 1, timestamp: -1 });

const CourseViewEventModel: Model<ICourseViewEvent> = models.CourseViewEvent || mongoose.model<ICourseViewEvent>('CourseViewEvent', CourseViewEventSchema);

export default CourseViewEventModel;
