import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { CreateNotification } from '../application/use-cases/create-notification.use.case';
import { getNotificationsByUser } from '../application/use-cases/get-by-user.use.case';
import { MarkNotificationAsRead } from '../application/use-cases/mark-notification.use.case';

const repositories = new RepositoryContainer();

export const NotificationServiceContainer = {
  getByUser: new getNotificationsByUser(repositories),
  create: new CreateNotification(repositories),
  markAsRead: new MarkNotificationAsRead(repositories),
};
