import { NotificationServiceContainer } from '../../../notification/infraestructure/notification-service-container';
import { INotification } from '../../interfaces/notifications';

const SOCKET_URL = process.env.SOCKET_SERVER_URL || 'http://localhost:5000';
const MAX_RETRIES = 5;

let socket: any = null;

function connectClient() {
  if (socket) return socket;
  try {
    // require dynamically so project can run even if socket.io-client is not installed
    // developer should install `socket.io-client` in the API project to enable real-time emits
    // npm install socket.io-client
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { io } = require('socket.io-client');
    socket = io(SOCKET_URL, { transports: ['websocket'] });
    socket.on('connect', () => {
      console.log('Connected to socket server', SOCKET_URL);
    });
    socket.on('connect_error', (err: any) => {
      console.warn('Socket connect error', err.message || err);
    });
  } catch (e) {
    const err: any = e;
    console.warn('socket.io-client not available or failed to connect', err.message || err);
    socket = null;
  }
  return socket;
}

async function send(notification: INotification) {
  // persist notification first (history)
  try {
    await NotificationServiceContainer.create.run(notification as any);
  } catch (err) {
    const e: any = err;
    console.error('Failed to persist notification before emit', e.message || e);
  }

  const s = connectClient();
  if (!s) {
    // schedule a retry stored as a new notification record with attempt metadata
    await retry(notification, 'no-socket-client');
    return;
  }

  let attempts = 0;
  const tryEmit = () => {
    attempts++;
    s.emit('notification', { userId: notification.userId, type: notification.type, message: notification.message }, async (ack: any) => {
      if (ack && ack.success) {
        // mark delivered by creating an update record (or you could update last saved entry)
        try {
          const n = { ...notification } as any;
          n.delivered = true;
          n.attempts = attempts;
          await NotificationServiceContainer.create.run(n);
        } catch (e) {
          console.error('Failed to persist delivered notification', e);
        }
        } else {
          if (attempts < MAX_RETRIES) {
            setTimeout(tryEmit, 1000 * attempts);
          } else {
            await retry(notification, 'no-ack');
          }
        }
    });
  };
  tryEmit();
}

async function retry(notification: INotification, reason: string) {
  try {
    const n = { ...notification } as any;
    n.attempts = (n.attempts || 0) + 1;
    n.lastError = reason;
    await NotificationServiceContainer.create.run(n);
  } catch (e) {
    console.error('Failed to save retry notification', e);
  }
}

export const NotificationClient = {
  send,
};
