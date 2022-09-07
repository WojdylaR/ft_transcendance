/* Import the function needed from the nestjs common core */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
/* Import the Web Socket Exception from nestjs */
import { WsException } from '@nestjs/websockets'
/* Import Socket for the WS (obviously) */
import { Socket } from 'socket.io'
/* Import the fonction needed from auth.service.ts */
import { AuthService } from '../auth.service'
/* Import the User table */
import { User } from 'src/users/users.entity'


/*
**  AuthGuard for ckets.
**  The function here simply verifies the JWT Token passed with the request.
**  It inject the data message in of the User object that include the user's ID and username (mostly).
**  /!\ Disclaimer /!\ This Guard should not be used on the "handleConnection" functions for the Web Sockets.
**      - You have to call "validateToken" manually.
**      - See status.gateway.ts
**  See Readme "Guards Web Sockets" for more informations about NestJS WS.
*/

@Injectable()
export class WsJwtGuard implements CanActivate {
	constructor(private authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const client: Socket = context.switchToWs().getClient<Socket>();
			const access_token: string | string[] = client.handshake.query.token as string;
			const user: User = await this.authService.validateToken(access_token);
			context.switchToWs().getData().user = user;
			return Boolean(user);
		} catch(err) {
			console.log("Encountered an error : " + err.message);
			throw new WsException(err.message);
		}
	}

}

