// pages/api/analytics/websocket.seller.ts
import { Server } from 'socket.io';
import { StudentProgressModel } from '@/models';

export default function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', socket => {
      const progressStream = new StudentProgressModel.watch();
      progressStream.on('change', async change => {
        if (change.operationType === 'insert') {
          const enrollment = change.fullDocument;
          socket.emit('newEnrollment', enrollment);
        }
      });
    });
  }
  res.end();
});