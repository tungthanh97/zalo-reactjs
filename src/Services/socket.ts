import { SOCKET_URL } from './url';
import io, { Socket } from 'socket.io-client';

class SocketService {
  private socket!: Socket;

  connect() {
    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
    });
  }
  join(username: string) {
    this.socket.emit('join', username);
  }
  sendMessage(username: string, message: string) {
    this.socket.emit('sendMessage', username, message);
  }
  onNewMessage(fn: (username: string, message: string) => void) {
    this.socket.on('message', fn);
  }
  onNotifyMessage(fn: (message: string) => void) {
    this.socket.on('notifyMessage', fn);
  }
  close() {
    this.socket.close();
  }
}

export const socketService = new SocketService();
