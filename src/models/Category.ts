
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  // Icon name could be stored if a mapping system is used, but icon components are frontend-specific.
}

const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
  slug: { type: String, required: true, trim: true, unique: true, lowercase: true },
}, { timestamps: true });

// Removed redundant index for slug as unique:true already creates it.
// CategorySchema.index({ slug: 1 });

const CategoryModel: Model<ICategory> = models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default CategoryModel;
