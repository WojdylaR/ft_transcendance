import { forwardRef, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(80, { 
	namespace: 'chat',
	transports: ['websocket'] })
export class ChatGateway implements OnModuleInit{

    @WebSocketServer() server: Server;
	private logger: Logger = new Logger('ChatGateway');


	constructor(
		@Inject(forwardRef(() => ChatService))
		private chatService: ChatService,
	//	private readonly roomService: RoomService,
	) { }

	onModuleInit()
	{
		this.logger.log("Chat Gateway Module initialized");
	}

	afterInit(server: Server)
	{
		this.logger.log("Chat Server listening");
	}

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log("Connection")
    }

    handleDisconnect(client: any) {
        this.logger.log("Disconnection")        
    }

}
