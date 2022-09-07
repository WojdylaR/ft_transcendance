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
**  This is the main AuthGuards @Injectable.
**  The main purpose here, is to ensure that the user is properly authenticated by using severals checks.
**  It's important to check those information BEFORE let the user access the ressources in the backend.
**  In order, the AuthGuards do:
**      1. Decodes the JWT passed as a header of a request.
**      2. Extracts the user associated with the JWT from the database.
**      3. If this user doesn't have 2FA enabled, it allows access.
**          (/!\ It allows access because the JWT was valid BEFORE this check, so no other check is requiered)
**      4. If this user has 2FA enable, it only allows access if the JWT has "isSecondFactorAuthenticated" set to true.
*/
@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy(Strategy, 'jwt-two-factor') {
	constructor() {
		super({
            /* 1. */
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'sup3r_secret_JWT_s3cret_strIng',
		});
	}

	async validate(payload: any) {
		if (payload && payload.id) {
            /* 2. */
			const user = await User.findOne({ where: { id: payload.id } });
			if (user && user.is_blocked) throw new HttpException("You are blocked from the website", 444);
			/* 3. */
            if (user && !user.isTwoFactorAuthenticationEnabled) {
				return { id: user.id, username: user.username, is_admin: user.is_admin };
			}
            /* 4. */
			if (user && payload && payload.isSecondFactorAuthenticated) {
				return { id: user.id, username: user.username, is_admin: user.is_admin };
			}
		}
		console.log("Token expired, or 2FA enabled, but the user isn't logged in via 2FA.")
	}
}
