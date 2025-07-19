
import mongoose, { Schema, Document, Model, models } from 'mongoose';

export interface ITrafficSourceEvent extends Document {
  sessionId: string;
  trafficSource: string;
  timestamp: Date;
}

const TrafficSourceEventSchema: Schema<ITrafficSourceEvent> = new Schema({
  sessionId: { type: String, required: true, unique: true }, // One entry per session
  trafficSource: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now, index: true },
});

const TrafficSourceEventModel: Model<ITrafficSourceEvent> =
  models.TrafficSourceEvent || mongoose.model<ITrafficSourceEvent>('TrafficSourceEvent', TrafficSourceEventSchema);

export default TrafficSourceEventModel;
