import { on } from "events";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = http.createServer(app);

const sockectServerIO = new Server(httpServer, {

    connectionStateRecovery: {},
    cors: {
        origin: "*",
    },
});

const socketEvents = {
    onConnection: "connection",
    onDisconnect: "disconnect",
    onMessage: "chat message",
}

sockectServerIO.on(socketEvents.onConnection, (socket: Socket) => {
    console.log("New client connected", socket.id);
   
    socket.on('identify', (userId: any) => {
        try {
            const room = `user_${userId}`;
            socket.join(room);
            console.log(`Socket ${socket.id} joined room ${room}`);
        } catch (e) {
            console.warn('identify handler error', e);
        }
    });

    // receive notification emissions from backend (API) and forward to target user's room
    socket.on('notification', (payload: any, ack: any) => {
        try {
            const room = `user_${payload.userId}`;
            const roomInfo = sockectServerIO.sockets.adapter.rooms.get(room);
            const hasClients = roomInfo && roomInfo.size > 0;
            if (hasClients) {
                sockectServerIO.to(room).emit('notification', payload);
                if (typeof ack === 'function') ack({ success: true });
            } else {
                if (typeof ack === 'function') ack({ success: false, reason: 'no-clients' });
            }
        } catch (err) {
            console.error('Error forwarding notification', err);
            if (typeof ack === 'function') ack({ success: false, reason: 'server-error' });
        }
    });

    //puede faltar la interfaz del payload
    socket.on(socketEvents.onDisconnect, (payload) => {
        console.log("Client disconnected", payload);
    })



    socket.on(socketEvents.onMessage, (payload) => {
        console.log("[ON CHAT MESSAGE]", JSON.stringify(payload));
        sockectServerIO.emit(socketEvents.onMessage, payload);
    })
});


const PORT = 5000;

httpServer.listen(PORT, () => {
    console.log(`Socket server running at http://localhost:${PORT}/`);
});