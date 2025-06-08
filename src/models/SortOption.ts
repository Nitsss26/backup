
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface ISortOption extends Document {
  value: string;
  label: string;
}

const SortOptionSchema: Schema<ISortOption> = new Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true },
}, { timestamps: true });

const SortOptionModel: Model<ISortOption> = models.SortOption || mongoose.model<ISortOption>('SortOption', SortOptionSchema);

export default SortOptionModel;
