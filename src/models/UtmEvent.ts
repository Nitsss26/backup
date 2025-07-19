
import mongoose, { Schema, Document, Model, models } from 'mongoose';

export interface IUtmEvent extends Document {
  source: string;
  timestamp: Date;
}

const UtmEventSchema: Schema<IUtmEvent> = new Schema({
  source: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now, index: true },
});

const UtmEventModel: Model<IUtmEvent> =
  models.UtmEvent || mongoose.model<IUtmEvent>('UtmEvent', UtmEventSchema);

export default UtmEventModel;
