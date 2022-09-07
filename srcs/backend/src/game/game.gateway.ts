import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';

@WebSocketGateway(90, {
  namespace: 'game',
  cors:{
    origin: true,
  },
  path: '/game'
})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket){
    console.log('Client connected : ' + client.id);
  }
}
