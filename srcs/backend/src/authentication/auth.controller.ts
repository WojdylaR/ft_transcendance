/* Import the common core of nestjs */
import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
/* Import the function needed for the user's interaction with the website
** Use for the instantiation and provide to other module the imports it make */
import { AuthService } from "./auth.service";


/*
**  Creation of the basic function for the user's authentification
**  That what Axios will called when used for the auth
**  The basic call for auth by Axios is /login
*/

@Controller('/login')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/* The authentication endpoint, that simply calls "authenticateUser" and catches errors 
    ** It's simply called when using /login with Axios */
    @Post()
	authenticateUser(@Body('code') code: string, @Body('state') state: string) {
		if (code == '' || state == '') {
			throw new BadRequestException();
		} else {
			try {
				return this.authService.authenticateUser(code, state);
			} catch(e) {
				throw e;
			}
		}
	}

    /* Used for the basic register if any user who want to create an account 
    ** Simply called when using /login/basic_auth_register with Axios */
	@Post('basic_auth_register')
	registerUserBasicAuth(@Body('username') username: string, @Body('password') password: string) {
		try {
			return this.authService.registerUserBasicAuth(username, password);
		} catch (e) {
			throw e;
		}
	}

    /* Used for the basic login of any user 
    ** Simply called when using /login/basic_auth_login with Axios */
	@Post('basic_auth_login')
	loginUserBasicAuth(@Body('username') username: string, @Body('password') password: string) {
		try {
			return this.authService.authenticateUserBasicAuth(username, password);
		} catch (e) {
			throw e;
		}
	}

}