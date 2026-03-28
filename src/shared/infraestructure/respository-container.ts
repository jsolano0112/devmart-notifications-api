import { NotificationRepository } from '../../notification/domain/repositories/notification.repository';


export class RepositoryContainer {
  public readonly notifications: NotificationRepository;

  constructor() {
    this.notifications = new NotificationRepository();
  }
}
