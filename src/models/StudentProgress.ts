// src/models/StudentProgress.ts
import mongoose, { Schema, Document, Model, models } from 'mongoose';

interface IStudentProgress extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  completedLessons: string[];
  progressPercentage: number;
  lastUpdated: Date;
}

const StudentProgressSchema = new Schema<IStudentProgress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLessons: [{ type: String }], // Lesson IDs or titles
  progressPercentage: { type: Number, default: 0, min: 0, max: 100 },
  lastUpdated: { type: Date, default: Date.now },
});

StudentProgressSchema.index({ userId: 1, courseId: 1 });
StudentProgressSchema.index({ courseId: 1, lastUpdated: -1 });

const StudentProgressModel: Model<IStudentProgress> =
  models.StudentProgress || mongoose.model<IStudentProgress>('StudentProgress', StudentProgressSchema);

export default StudentProgressModel;