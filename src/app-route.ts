import { Router, Request, Response } from 'express';
import { notificationRouter } from './notification/application/routes/notification.route';

const appRouter: Router = Router();

appRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    message: 'NOTIFICATIONS - API',
  });
});

appRouter.use('/api/v1/notifications', notificationRouter);

export default appRouter;
