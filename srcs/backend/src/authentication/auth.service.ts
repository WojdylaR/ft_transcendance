/* eslint-disable prettier/prettier */
/* Import the common core of nestjs */
import { Injectable, BadRequestException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
/* Import Axios to communicate with the frontend */
import { HttpService } from '@nestjs/axios';
/* Import the JSON Web Token Module */
import { JwtService } from '@nestjs/jwt';
/* Import the Config Module */
import { ConfigService } from '@nestjs/config';
/* Import Logger for the login function from nestjs */
import { Logger } from '@nestjs/common';
/* Import map interceptors function from operators */
import { map } from 'rxjs/operators';
/* Import User table */
import { User } from '../users/users.entity';
/* Import the encryption and hasing function from bcrypt */
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private readonly httpService: HttpService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

	private logger: Logger = new Logger('AuthService');

    /* Used for the registerUserBasicAuth function in auth.controller.ts
    ** and when Axios call /login/basic_auth_register 
    ** Simply create a user and do all the check requiere to avoid database error */
	async registerUserBasicAuth(username: string, password: string) {
		try {
			if (!username || username.length <= 3) throw new ForbiddenException("Name must be at least 4 characters");
			if (!password || password.length <= 6) throw new ForbiddenException("Password must be at least 7 characters");
			const invalidChars = /^[a-zA-Z0-9-_]+$/;
			if (username.search(invalidChars) === -1 || username.length > 15) throw new ForbiddenException("Invalid characters in username or username too long");
			
			const existing = await User.findOne({ where :
				{ displayname: username }
			});
			if (existing) throw new ForbiddenException("Name is already taken.");

			const newUser = User.create();
			newUser.username = "_" + username;
			newUser.displayname = username;
			newUser.password = await bcrypt.hash(password, 5);
			return await User.save(newUser);
		} catch (e) {
			throw e;
		}
	}

    /* Used for the loginUserBasicAuth function in auth.controller.ts 
    ** and when Axios call /login/basic_auth_login 
    ** Simply check the information send by the user to see if it match with an existant user 
    ** Also do the basic check */
	async authenticateUserBasicAuth(username: string, password: string) {
		try {
			if (!username || !password) throw new ForbiddenException("Username or password empty");
			const invalidChars = /^[a-zA-Z0-9-_]+$/;
			if (username.search(invalidChars) === -1 || username.length > 15) throw new ForbiddenException("Invalid characters in username or username too long");
			const existingUser = await User.findOne({ where: { displayname: username } });
			if (!existingUser) throw new ForbiddenException("No user with such username");

			const passwordMatch = await bcrypt.compare(password, existingUser.password);
			if (!passwordMatch) throw new ForbiddenException("Wrong password for this username");


			let returnObject : { username?: string, accessToken?: string, twoFARedirect?: boolean };
			returnObject = {};
			returnObject.username = existingUser.username;
			returnObject.accessToken = this.jwtService.sign({ id: existingUser.id, username: existingUser.username, isSecondFactorAuthenticated: false }, { expiresIn: '24h' });
			if (existingUser.isTwoFactorAuthenticationEnabled === true) {
				returnObject.twoFARedirect = true;
			}
			return returnObject;
		} catch (e) {
			throw e;
		}
	}

	/* An OAuth token is used here from 42 (see Readme for more informations about OAuth).
	** The purpose is to retrieve the uses's account information without revealing the user's credentials. */
	async getInfoFromAPI(access_token: string) {
		const headersRequest = { 'Authorization': 'Bearer ' + access_token };
		const info = await this.httpService.get(this.configService.get<string>('42_API'), { headers: headersRequest }).pipe(
			map(resp => resp.data)
		).toPromise();

		var infos: any = {};
		infos.username = info.login;
		return infos;
	}

	/* Verify the validity of a Json Web Token and return the User corresponding to the token.
	** An error error is return if not. */
	async validateToken(access_token: string): Promise<User> {
		try {
			const decoded = await this.jwtService.verify(access_token);
			const user = User.findOne(decoded.id, {relations: ["channels"]});
			return user;
		} catch {
			throw new UnauthorizedException();
		}
	}

	/* Just a function calling the previous one and return 'null'. 
	** Used if, instead of an exception, we need an object. */
	async customWsGuard(access_token: string): Promise<User | null> {
		try {
			const user = await this.validateToken(access_token);
			return user;
		} catch {
			return null;
		}
	}

	/*
	**	This is the main function to allows to user's authentication.
	**	First, it take the code returned by the 42 OAuth and verifies if it's a valid token by retrieving an OAuth token with it.
	**	Second, we have verified the validity of the code return so the user can be logged with the 42 OAuth strategy.
	**	Third, we used the information returned by the token to create an user with the 42 username if the username is not tken.
	**	If the user is correctly create, we use the user ID and username to create a proper JSON Web Token.
	**	/!\ Warning /!\ This JWT that we create don't go through the 2FA process.
	**	For users that have 2FA activated, it only allow them to get to the 2FA page.
	**	We should redirect the user to the 2FA page if he has activated it.
	*/
	async authenticateUser(code: string, state: string) {
		try {
			/* Variable creation with the information contain in the .env */
			const url = this.configService.get<string>('https://api.intra.42.fr/oauth/token');
			const postData = { grant_type: 'authorization_code',
								client_id: this.configService.get<string>('87a93e61b53173066096dbc19ad9d83248238c0889d2ec08597531900dcfc6a4'),
								client_secret: this.configService.get<string>('b10e8da3f98763b0ac79fca4829abb376c18c4640d599d898c2c2511e650ca0a'),
								code: code,
								redirect_uri: this.configService.get<string>('http://127.0.0.1:8080/auth/oauth_callback') }
			const result = await this.httpService.post(url, postData).pipe(map(resp => resp.data)).toPromise();
			const infos = await this.getInfoFromAPI(result.access_token);
			const existingUser = await User.findOne({ where: { username: infos.username } });
			/* After getting the informations, we're testing if the user is created and create one if not. */
			if (!existingUser) {
				this.logger.log("We don\'t have the user " + infos.username + ". Creating it in database.");
				const newUser = User.create();
				newUser.username = infos.username;
				/* Simply put the admin trait if the created account is one of the dev */
				if (infos.username === this.configService.get<string>('qbruinea')) newUser.is_admin = 'owner';
				if (infos.username === this.configService.get<string>('rwojdyla')) newUser.is_admin = 'owner';
				if (infos.username === this.configService.get<string>('lfourage')) newUser.is_admin = 'owner';

				/* If an account already exist with the student username, add an "_" */
				let displayname = infos.username;
				let tool = 1;
				let displaynameConflict: User | null = await User.findOne({ where: { displayname: displayname } });
				while (displaynameConflict)
				{
					tool++;
					displayname = infos.username + "_" + tool.toString();
					displaynameConflict = await User.findOne({ where: { displayname: displayname } });
				}

				newUser.displayname = displayname;
				await User.save(newUser);
			}
			/* Creation and association of the JWT with the user */
			const user = await User.findOne({ where: { username: infos.username } });
			let returnObject : { username?: string, accessToken?: string, twoFARedirect?: boolean };
			returnObject = {};
			returnObject.username = infos.username;
			returnObject.accessToken = this.jwtService.sign({ id: user.id, username: user.username, isSecondFactorAuthenticated: false }, { expiresIn: '24h' });
			if (user.isTwoFactorAuthenticationEnabled === true) {
				returnObject.twoFARedirect = true;
			}

			return returnObject;
		} catch(e) {
			throw e;
		}
	}

}