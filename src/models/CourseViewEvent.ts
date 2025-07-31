
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface ICourseViewEvent extends Document {
  courseId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  sessionId?: string;
  timestamp: Date;
  source?: string; // e.g., 'course_listing', 'direct_link', 'recommendation'
}

const CourseViewEventSchema: Schema<ICourseViewEvent> = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: false },
  sessionId: { type: String, trim: true, index: true },
  timestamp: { type: Date, default: Date.now, index: true },
  source: { type: String, trim: true },
});

const CourseViewEventModel: Model<ICourseViewEvent> = models.CourseViewEvent || mongoose.model<ICourseViewEvent>('CourseViewEvent', CourseViewEventSchema);

export default CourseViewEventModel;
