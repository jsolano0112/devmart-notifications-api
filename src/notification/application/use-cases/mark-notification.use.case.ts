import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';

export class MarkNotificationAsRead {
  constructor(private repo: RepositoryContainer) {}

  async run(id: string): Promise<void> {
    const notification = await this.repo.notifications.getById(id);
    if (!notification) throw new Exception('Notification not found', 404);
    notification.read = true;
    await this.repo.notifications.update(id, notification);
  }
}
