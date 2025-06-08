
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IPaymentOption extends Document {
  optionId: string; // 'id' from your constants
  name: string;
}

const PaymentOptionSchema: Schema<IPaymentOption> = new Schema({
  optionId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
}, { timestamps: true });

const PaymentOptionModel: Model<IPaymentOption> = models.PaymentOption || mongoose.model<IPaymentOption>('PaymentOption', PaymentOptionSchema);

export default PaymentOptionModel;
