/* eslint-disable prettier/prettier */
/* Import from the current core of nestjs common to handle request */
import { Controller, Post, Get, Put, UseGuards, Param, Req, Res, Body, NotFoundException, Query, BadRequestException, UseInterceptors, UploadedFile, ForbiddenException } from "@nestjs/common";
/* Import the pagination tool that typeorm can handle */
import { paginate, Pagination } from "nestjs-typeorm-paginate";
/* Import interceptor from rxjs to handle and extend the function behavior */
import { from, map, Observable } from "rxjs";
/* Import User table */
import { User } from "./users.entity";
/* Import the function needed for the user's interaction with the website 
   Use for the instantiation and provide to other module the imports it make */
import { UsersService } from "./users.service";
/* Import interceptor from nestjs to handle and extend the function behavior */
import { FileInterceptor } from "@nestjs/platform-express";
/* Import the file upload technique from multer */
import { diskStorage } from "multer";
/* Import injector from typeorm to interact with the database */
import { InjectRepository } from "@nestjs/typeorm";
/* Import for the database */
import { Repository } from "typeorm";
/* Import the UserWithRank class */
import { UserWithRank } from "./user.interface";
import JwtTwoFactorGuard from "src/authentication/jwt/jwt-two-factor-auth.guards";

/*  
**  Creation of the controller to handle the behavior with the user's interaction 
**  Creation of the backend web pages behavior 
**  That what the frontend while call with Axios in the frontend/users.service.ts 
**  Example for the frontend .ts: 
** 	getCurrUserId() {
**      return axios.get(http://127.0.0.1:3000/ + 'user', { headers: authHeader() });
**  }
*/
@Controller('/user')
export class UserController {
    constructor(private readonly userService: UsersService) {}

	/*  Endpoints related to the current user
    **  It's where the function is connecting with the database to retrieve informations of the current user.
	**	===================================================================================================== */

	/* 
	** ============================
	** GET CURRENT USER INFORMATION
	** ============================
	*/

	/* Returns current user ID 
	** It's the primary function when Axios call /user */
	@Get()
    @UseGuards(JwtTwoFactorGuard)
	findCurrentUserId(@Req() req) {
		return {id: req.user.id};
	}

	/* Returns public informations about the current user 
	** Axios call /user/info/me */
	@Get('info/me')
    @UseGuards(JwtTwoFactorGuard)
	async getCurrUserInfo(@Req() req) {
		try {
			const user = await User.findOne({ where: { id: req.user.id } });
			if (!user) {
				throw new NotFoundException();
			}
			/* Delete the 2FA secret, we want to keep this information private */
			delete user.twoFactorAuthenticationSecret;
			return user;
		} catch (e) {
			throw e;
		}
	}

	/*
	**	===============================
	**	UPDATE CURRENT USER INFORMATION
	**	===============================
	*/

	/* Allows to change the current user display name 
	** Axios call /user/displayname */
	@Post('displayname')
    @UseGuards(JwtTwoFactorGuard)
	changeUserdisplayname(@Body('displayname') newdisplayname: string, @Req() req): Promise<string> {
		try {
			return this.userService.changeUserdisplayname(req.user.id, newdisplayname);
		} catch (e) {
			throw e;
		}
	}
	
	/*
	**	==============================
	**	AVATAR CURRENT USER MANAGEMENT
	**	==============================
	*/

	/* Returns current user avatar 
	** Axios call /user/avatar/me */
	@Get('avatar/me')
   	@UseGuards(JwtTwoFactorGuard)
	async getCurrentUserAvatar(@Req() req, @Res() res) {
		const user = await User.findOne(({ where: { id: req.user.id } }));
		res.sendFile(user.avatar, { root: 'images' });
	}

	/* Updates the current user avatar (only allows jpg, jpeg, png and gif files.
	** The limits of the file size is set to 50MB (see below). 
	** Axios call /user/avatar/update */
	@Post('avatar/update')
   	@UseGuards(JwtTwoFactorGuard)
	@UseInterceptors(FileInterceptor('avatar', {
		limits: {
			/* File size limits set to 50MB */
			fileSize: 5 * 10 * 10 * 10 * 10 * 10 * 10 * 10
		},
		storage: diskStorage({
			destination: './images',
		}),
		fileFilter: (req: Request, file, cb) => {
			if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
				return cb(new ForbiddenException('Only image files are allowed'), false);
			}
			return cb(null, true);
		}
	}))
	async saveAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
		try {
			await this.userService.updateAvatar(req.user.id, file.filename);
		} catch(e) {
			throw e;
		}
	}

	/*  Endpoints related to the other users
    **  It's where the function is connecting with the database to retrieve informations of the other users.
	**	==================================================================================================== */


	
	/*  Endpoints related to the friends lists
    **  It's where the function is connecting with the database to retrieve informations concerning the friends requests.
	**	================================================================================================================= */



	/*  Endpoints related to the admin part
    **  It's where the function is connecting with the database to retrieve informations for the admin.
	**	=============================================================================================== */


}