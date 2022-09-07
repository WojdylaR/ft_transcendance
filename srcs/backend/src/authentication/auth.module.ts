/* Import the common core of nestjs */
import { forwardRef, Module } from '@nestjs/common';
/* Import Axios to communicate with the frontend */
import { HttpModule } from '@nestjs/axios';
/* Import the Config Module */
import { ConfigModule } from '@nestjs/config';
/* Import the JSON Web Token Module */
import { JwtModule } from '@nestjs/jwt';
/* Import the Passport Module */
import { PassportModule } from '@nestjs/passport';
/* Import the set of controllers defined in this module */
import { AuthController } from './auth.controller';
/* Import the function needed for the user's interaction with the website
** Use for the instantiation and provide to other module the imports it make */
import { AuthService } from './auth.service';
/* Import the user module to interact with the user entity */
import { UsersModule } from 'src/users/users.module';
/* Import the JWT strategy */
import { JwtStrategy } from './jwt/jwt-strategy';
/* Import the JWT strategy */
import { JwtTwoFactorStrategy } from './jwt/jwt-two-factor-strategy';
/* Import the JWT strategy */
import { JwtTwoFactorAdminStrategy } from './jwt/jwt-two-factor-admin-strategy';
/* Import the WS (Web Socket) JWT strategy */
import { WsJwtGuard } from './jwt/ws-jwt-strategy';


/*
**	Regroup and allows to import and export the function of the methods needed.
*/

@Module({
	imports: [HttpModule, 
			JwtModule.register({ secret: 'sup3r_secret_JWT_s3cret_strIng' }), 
			ConfigModule, 
			PassportModule, 
			UsersModule
			],
	exports: [AuthService],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, JwtTwoFactorStrategy, JwtTwoFactorAdminStrategy, WsJwtGuard],
})
export class AuthModule {}