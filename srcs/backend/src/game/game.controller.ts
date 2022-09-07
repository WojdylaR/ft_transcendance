import { Controller, Get, Patch, Param, Body, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { Socket } from 'socket.io';
import { PassportStrategy } from '@nestjs/passport';

@Controller('/game')
export class GameController {
    constructor(private readonly gameService: GameService) {}


    @Post('getscore')
    getScore(@Body('roomId') roomId: String){
        try {
            return this.gameService.getScore(roomId)
        } catch (e) {
            return e;
        }
    }

    @Post('createroom')
    createRoom(@Body('playerOne') playerOne: String){
        try {
            return this.gameService.createRoom(playerOne);
        } catch(e) {
            throw e;
        }
    }

    @Post('startgame')
    startGame(@Body('gameStart') gameStart: boolean, @Body('roomId') roomId: String){
        try {
            return this.gameService.startGame(gameStart, roomId)
        } catch(e) {
            throw e;
        }
    }
}
