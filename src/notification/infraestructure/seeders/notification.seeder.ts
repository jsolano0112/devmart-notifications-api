import { NotificationSchema } from '../../domain/models/notification.schema';

export const seedNotifications = async () => {
  console.log('Init notificaciones seeders...');

  const notifications = [
    {
      userId: 1,
      message: 'Tu pedido #1001 ha sido recibido.',
      type: 'ORDER',
      read: false,
    },
    {
      userId: 2,
      message: 'Tu pago fue aprobado.',
      type: 'PAYMENT',
      read: false,
    },
    {
      userId: 3,
      message: 'Tu pedido está en tránsito.',
      type: 'ORDER',
      read: true,
    },
  ];

  await NotificationSchema.deleteMany({});
  console.log('Previous notifications deleted.');

  await NotificationSchema.insertMany(notifications);
  console.log(`${notifications.length} notifications inserted.`);
};
