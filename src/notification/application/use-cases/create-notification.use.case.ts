import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { INotification } from '../../../shared/interfaces/notifications';

export class CreateNotification {
  constructor(private repo: RepositoryContainer) {}

  async run(notification: INotification): Promise<void> {
    const user = await this.repo.users.getUserById(notification.userId);
    if (!user) throw new Exception('User not found.', 404);
    await this.repo.notifications.create(notification);
  }
}
