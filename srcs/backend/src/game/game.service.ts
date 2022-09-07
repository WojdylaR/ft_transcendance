import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  

    rooms = [];

    async getRoom(roomId : String) : Promise<any>{
        let x = 0;
        while (this.rooms[x].roomId != roomId){
            x++;
        }
        return this.rooms[x];
    }

    async createRoom(playerOne: String) : Promise<any>{
        let room = {roomId: "", player:[], leftCross: [40,60] ,rightCross: [40,60], ball: [50,50], gamestart: false, score: [0,0]}
        room.roomId =   Math.random().toString(36).substr(2, 9);
        room.player.push(playerOne);
        this.rooms.push(room);
        console.log("room " + room.roomId + " create by " + playerOne);
        return room
    }

    async startGame(gamestart: boolean, roomId: String) : Promise<any>{
        let x = 0;
        while (this.rooms[x].roomId != roomId){
            x++;
        }
        this.rooms[x].gamestart = gamestart;
        return this.rooms[x];
    }

    async getScore(roomId: String) : Promise<any>{
        let x = 0;
        while (this.rooms[x].roomId != roomId){
            x++;
        }
        return(this.rooms[x].score)
    }
}
