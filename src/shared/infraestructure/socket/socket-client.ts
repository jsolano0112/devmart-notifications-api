import { INotification } from "../../interfaces/notifications";

// notification-client.ts
const SOCKET_URL = process.env.SOCKET_SERVER_URL || 'http://localhost:5000';

async function send(notification: INotification) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { io } = require('socket.io-client');
    
    // Conexión On-Demand
    const socket = io(SOCKET_URL, { 
      transports: ['websocket'],
      forceNew: true 
    });

    socket.on('connect', () => {
      socket.emit('notification', { 
        userId: notification.userId, 
        type: notification.type, 
        message: notification.message 
      }, (ack: any) => {
        socket.disconnect();
        resolve(ack);
      });
    });

    socket.on('connect_error', (err: any) => {
      socket.disconnect();
      reject(err);
    });

    setTimeout(() => {
      if (!socket.connected) {
        socket.disconnect();
        reject(new Error('Socket timeout'));
      }
    }, 5000);
  });
}

export const NotificationClient = { send };