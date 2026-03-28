import { model, Schema } from 'mongoose';
import { INotification } from '../../../shared/interfaces/notifications';

const notificationSchema = new Schema<INotification & { attempts?: number; delivered?: boolean; lastError?: string }>(
  {
    userId: { type: Number, required: true },
    message: { type: String, required: true },
    type: { type: String, required: false },
    read: { type: Boolean, default: false },
    // delivery metadata
    attempts: { type: Number, default: 0 },
    delivered: { type: Boolean, default: false },
    lastError: { type: String, required: false },
  },
  { timestamps: true },
);
export const NotificationSchema = model<INotification & { attempts?: number; delivered?: boolean; lastError?: string }>(
  'Notification',
  notificationSchema,
);
