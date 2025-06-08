
import mongoose, { Schema, Document, models, Model } from 'mongoose';
import type { ICourse } from './Course';
import type { IUser } from './User';

export interface ICertificate extends Document {
  course: mongoose.Types.ObjectId | ICourse;
  user: mongoose.Types.ObjectId | IUser;
  issueDate: Date;
  certificateUrl?: string; // URL to the generated certificate PDF/image
  verificationId: string; // Unique ID for verifying the certificate
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema: Schema<ICertificate> = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  issueDate: { type: Date, default: Date.now, required: true },
  certificateUrl: { type: String, trim: true },
  verificationId: { type: String, required: true, unique: true, default: () => new mongoose.Types.ObjectId().toHexString() },
}, { timestamps: true });

CertificateSchema.index({ user: 1, course: 1 });
CertificateSchema.index({ verificationId: 1 });

const CertificateModel: Model<ICertificate> = models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);

export default CertificateModel;
