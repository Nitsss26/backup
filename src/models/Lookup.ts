
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface ILookup extends Document {
  type: 'INSTRUCTOR_TYPE' | 'DIFFICULTY_LEVEL' | 'LANGUAGE';
  value: string;
}

const LookupSchema: Schema<ILookup> = new Schema({
  type: { 
    type: String, 
    required: true, 
    enum: ['INSTRUCTOR_TYPE', 'DIFFICULTY_LEVEL', 'LANGUAGE'] 
  },
  value: { type: String, required: true, trim: true },
}, { timestamps: true });

LookupSchema.index({ type: 1, value: 1 }, { unique: true });

const LookupModel: Model<ILookup> = models.Lookup || mongoose.model<ILookup>('Lookup', LookupSchema);

export default LookupModel;
