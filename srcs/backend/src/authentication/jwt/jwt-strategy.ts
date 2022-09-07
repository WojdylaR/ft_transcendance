/* Import the passport strategy to allows the use of JWT */
import { ExtractJwt, Strategy } from "passport-jwt";
/* Import the PassportStrategy to extends it and do our own Injectable */
import { PassportStrategy } from "@nestjs/passport";
/* Import the Injectable from nestjs common core */
import { Injectable } from "@nestjs/common";


/*
**  This AuthGuard @Injectable simply verifiy the validity of a JWT passed as a header of a request.
**  /!\ WARNING /!\
**  This is not the final authentication guards the back is gonna use.
**  The principal use here is to allow the user with 2FA activated to reach the page where he can input his 2FA code.
**  The final authentication guards endpoint gonna be JwtTwoFactorGuard, that gonna work with or without the user's 2FA.
*/
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'sup3r_secret_JWT_s3cret_strIng',
		});
	}

	async validate(payload: any) {
		return { id: payload.id, username: payload.username };
	}
}
