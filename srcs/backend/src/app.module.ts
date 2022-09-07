/* Import Module from the common core of @nestjs/common */
import { Module } from '@nestjs/common';
/* Import the HttpModule from @nestjs/axios to interact between front and back to the db */
import { HttpModule } from '@nestjs/axios';
/* Import the ConfigModule to set the configuration for the each module */
import { ConfigModule } from '@nestjs/config';
/* Import the DatabaseModule (for the creation of the db) */
import { DatabaseModule } from './configuration/database.module';
/* Import the AuthModule (for the authentication strategy) */
import { AuthModule } from './authentication/auth.module';
/* Import the UsersModule (for the user's interaction with the website) */
import { UsersModule } from './users/users.module';

import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game.module';



/*
**  This is where we're gonna import all the module needed.
**  It's like the "main" of the backend.
**  It's what gonna react to ALL interaction and when you go and each part of the back.
*/

@Module({
  imports: [AuthModule, 
        UsersModule, 
        HttpModule, 
        DatabaseModule,
        ChatModule,
        GameModule
	],
})
export class AppModule {}