
import mongoose, { Schema, Document, Model, models } from 'mongoose';

export type EventType = 
    | 'page_view'
    | 'click'
    | 'scroll'
    | 'add_to_cart'
    | 'remove_from_cart'
    | 'start_checkout'
    | 'order_completed'
    | 'course_view'
    | 'book_view'
    | 'user_login'
    | 'user_signup'
    | 'seller_signup'

export interface IAnalyticsEvent extends Document {
    eventType: EventType;
    timestamp: Date;
    sessionId: string;
    uniqueUserId: string; // Persistent across sessions
    userId?: mongoose.Types.ObjectId; // For logged-in users
    page: string;
    section?: string;
    element?: string;
    courseId?: string;
    bookId?: string;
    itemId?: string; // Generic ID for items like cart
    duration?: number; // For time-spent events
    scrollDepth?: number;
    geoData?: {
        country: string;
        city?: string;
        state?: string;
    };
    device?: string;
    browser?: string;
    trafficSource?: string;
}

const AnalyticsEventSchema: Schema<IAnalyticsEvent> = new Schema({
    eventType: { type: String, required: true, index: true },
    timestamp: { type: Date, default: Date.now, index: true },
    sessionId: { type: String, required: true, index: true },
    uniqueUserId: { type: String, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    page: { type: String, required: true, index: true },
    section: { type: String, index: true },
    element: { type: String },
    courseId: { type: String, index: true },
    bookId: { type: String, index: true },
    itemId: { type: String },
    duration: { type: Number },
    scrollDepth: { type: Number },
    geoData: {
        country: String,
        city: String,
        state: String
    },
    device: String,
    browser: String,
    trafficSource: { type: String, index: true },
}, { timestamps: { createdAt: 'timestamp', updatedAt: false } });

const AnalyticsEventModel: Model<IAnalyticsEvent> = models.AnalyticsEvent || mongoose.model<IAnalyticsEvent>('AnalyticsEvent', AnalyticsEventSchema);

export default AnalyticsEventModel;
