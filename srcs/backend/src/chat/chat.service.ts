import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class ChatService {

	//private users: ChatUser[] = [];

    constructor(){}
    
    async ConnectUser(socket:Socket) {
    return
   }
};