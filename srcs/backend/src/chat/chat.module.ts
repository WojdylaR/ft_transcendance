import { Module } from '@nestjs/common';
import { AuthModule } from 'src/authentication/auth.module';
import { ChatService } from './chat.service';
import { UsersModule } from 'src/users/users.module';
import { ChatGateway } from './chat.gateway';

@Module({
	imports: [
		UsersModule,
		AuthModule,
	],
	providers: [ChatService, ChatGateway],
	exports: [ChatService]
})
export class ChatModule {}