import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { validateId } from '../../../shared/helpers/get-id.validator';
import { validateCreateNotification } from '../middlewares/create-notification.validator';
import { verifyAuthToken } from '../../../shared/helpers/jwt-validator';
import { validateUserIdNumberParameter } from '../../../shared/helpers/user-id.validator';

const controller = new NotificationController();
const notificationRouter: Router = Router();

/**
 * @swagger
 * /api/v1/notifications/getByUser/{userId}:
 *   get:
 *     summary: Get all notifications by user ID
 *     description: Returns all notifications associated with the given user ID.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of notifications for the user.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 type: "info"
 *                 message: "Your order has been shipped."
 *                 userId: 1
 *                 createdAt: "2025-10-05T14:32:00Z"
 *               - id: 2
 *                 type: "warning"
 *                 message: "Payment pending for your last order."
 *                 userId: 3
 *                 createdAt: "2025-10-04T10:15:00Z"
 */

notificationRouter.get(
  '/getByUser/:userId',
  validateUserIdNumberParameter,
  verifyAuthToken,
  controller.getByUser,
);

/**
 * @swagger
 * /api/v1/notifications:
 *   post:
 *     summary: Create a new notification
 *     description: Creates a notification for a specific user.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             type: "info"
 *             message: "Your order #12345 has been shipped."
 *             userId: 3
 *             createdAt: "2025-10-05T14:32:00Z"
 *     responses:
 *       200:
 *         description: Notification created.
 */
notificationRouter.post(
  '/',
  validateCreateNotification,
  verifyAuthToken,
  controller.create,
);

/**
 * @swagger
 * /api/v1/notifications/{id}/read:
 *   patch:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Notification ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read.
 *       404:
 *         description: Notification not found.
 */
notificationRouter.patch(
  '/:id/read',
  validateId,
  verifyAuthToken,
  controller.markAsRead,
);

export { notificationRouter };
