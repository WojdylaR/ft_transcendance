/* Import the passport strategy to allows the use of JWT */
import { ExtractJwt, Strategy } from "passport-jwt";
/* Import the PassportStrategy to extends it and do our own Injectable */
import { PassportStrategy } from "@nestjs/passport";
/* Import the Injectable and the HttpException from nestjs common core 
** The HttpException is use here the handle all the unhandled exception by our application
** (see Exception filters for more infos) */
import { HttpException, Injectable } from "@nestjs/common";
/* Import the User table */
import { User } from '../../users/users.entity';


/*
**  This AuthGuard @Injectable has the same purpose has the "jwt-two-factor-strategy.ts"
**  The only difference is that this one is use for admin user.
**  It gonna check if the user is an admin or not, to see if the user has the right to access certains pages
**  To see further, see the "jwt-two-factor-strategy.ts"
*/
@Injectable()
export class JwtTwoFactorAdminStrategy extends PassportStrategy(Strategy, 'jwt-two-factor-admin') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'sup3r_secret_JWT_s3cret_strIng',
		});
	}

	async validate(payload: any) {
		const user = await User.findOne({ where: { id: payload.id } });
		if (user && user.is_blocked) throw new HttpException("You are blocked from the website", 444);
		if (user && user.is_admin !== "owner" && user.is_admin !== "moderator") throw new HttpException("You are not authorized to access this resource", 445);

		if (user && !user.isTwoFactorAuthenticationEnabled) {
			return { id: user.id, username: user.username, is_admin: user.is_admin };
		}
		if (payload && payload.isSecondFactorAuthenticated) {
			return { id: user.id, username: user.username, is_admin: user.is_admin };
		}
		console.log("Token expired, or 2FA enabled, but the user isn't logged in via 2FA.")
	}
}
