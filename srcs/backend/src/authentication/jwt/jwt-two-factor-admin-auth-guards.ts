/* Import the Injectable module from the common core of nestjs */
import { Injectable } from "@nestjs/common";
/* Import the AuthGuard Injectable from nestjs passport (see "Guards") */
import { AuthGuard } from "@nestjs/passport";


/*
**  This peer work with the "jwt-two-factor-admin-strategy.ts"
**  See the files for more infos.
*/
@Injectable()
export default class JwtTwoFactorAdminGuard extends AuthGuard('jwt-two-factor-admin') {}
