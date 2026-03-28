import { Request, Response, NextFunction } from 'express';
import { NotificationServiceContainer } from '../../infraestructure/notification-service-container';
import { INotification } from '../../../shared/interfaces/notifications';
export class NotificationController {
  public async getByUser(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { userId } = request.params;
      const notifications = await NotificationServiceContainer.getByUser.run(
        Number(userId),
      );
      return response.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  }

  public async create(
    request: Request<null, void, INotification>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await NotificationServiceContainer.create.run(request.body);
      return response.status(200).json('Notification created.');
    } catch (error) {
      next(error);
    }
  }

  public async markAsRead(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = request.params;
      await NotificationServiceContainer.markAsRead.run(id);
      return response.status(200).json('Notification marked as read.');
    } catch (error) {
      next(error);
    }
  }
}
