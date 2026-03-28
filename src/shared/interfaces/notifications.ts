export interface INotification {
  type: string;
  message: string;
  userId: number;
  createdAt: Date;
  read: boolean;
}

export interface INotificationResponse {
  id: string;
  type: string;
  message: string;
  userId: number;
  createdAt: Date;
  read: boolean;
}
