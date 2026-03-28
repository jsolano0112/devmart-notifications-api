import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';

export class getNotificationsByUser {
  constructor(private repo: RepositoryContainer) {}

  async run(userId: number) {
    const user = await this.repo.users.getUserById(userId);
    if (!user) throw new Exception('User not found.', 404);
    const notifications = await this.repo.notifications.getByUser(userId);
    //return only 15
    return notifications.slice(0, 15);
  }
}
