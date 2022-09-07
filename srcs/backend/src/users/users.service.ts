/* eslint-disable prettier/prettier */
/* Import from the current core of nestjs common to handle request */
import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
/* Import injector from typeorm to interact with the database */
import { InjectRepository } from '@nestjs/typeorm';
/* Import interceptor from rxjs to handle and extend the function behavior */
import { from, Observable, map } from 'rxjs';
/* Import for the database */
import { Like, Raw, Repository, getConnection, MoreThan } from 'typeorm';
/* Import User table */
import { User } from './users.entity';
/* Import the pagination tool that typeorm can handle */
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
/* Import function from fs to dynamic module managements */
import { unlink } from 'fs';
/* Import function Logger from nestjs common core */
import { Logger } from '@nestjs/common'

/*
**  Creation of Injectable that are Interceptor class to handle the result, the exception thrown
**  and extend the behavior of the function used before (in users.controller.ts for example).
*/
@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) 
		private usersRepository: Repository<User>
        ) {}

        private logger: Logger = new Logger('UsersService');

	/*
	** ====================
	** GET USER INFORMATION
	** ====================
	*/

	/* Returns all public informations about the user */
	async findUserById(id: number): Promise<User> {
	const user = await this.usersRepository.findOne({ where: { id: id }, relations: ["blocked"]});
	if (!user) {
			throw new NotFoundException();
		}
		/* delete the Authentification informations to keep those privates */
		delete user.isTwoFactorAuthenticationEnabled;
		delete user.twoFactorAuthenticationSecret;
		return user;
	}
    
	/* Retrieve the user score by simply get the score in the database */
	async getUserRank(id: number): Promise<number> {
		const user = await this.usersRepository.findOne({ where: { id: id } });
		const allBetterScores = await this.usersRepository.createQueryBuilder()
														.select('DISTINCT score')
														.where("score > :userScore", { userScore: user.score })
														.execute()
		return (allBetterScores.length + 1);
	}





	/*
	**	=======================
	**	UPDATE USER INFORMATION
	**	=======================
	*/

	/* Allows to change the user display name.
	** If the name contains caracters that are not letters, numbers, of '_', '-', 
	** or if the chosen name is already taken, throws an exception.
	*/
	async changeUserdisplayname(id: number, newdisplayname: string): Promise<string> {
		const invalidChars = /^[a-zA-Z0-9-_]+$/;
		if (newdisplayname.search(invalidChars) === -1 || newdisplayname.length > 15) { throw new ForbiddenException(); }
		const duplicate = await this.usersRepository.findOne({ where: { displayname: newdisplayname } });
		if (duplicate) { throw new BadRequestException(); }

		const user = await this.usersRepository.findOne({ where: {id: id} });
		user.displayname = newdisplayname;
		this.usersRepository.save(user);
		return user.displayname;
	}

/*TwoFactorAuthenticationService*

	/*
	**	======================
	**	AVATAR USER MANAGEMENT
	**	======================
	*/

	/* This function updates the path of the avatar of the user in the database,
	** the file was already uploaded from the controller.
	** If the user already had a custom avatar, we delete his previous avatar with "unlink".
	*/
	async updateAvatar(id: number, filename: string) {
		try {
			const user = await User.findOne({ where: { id: id } });
			if (user.avatar === "default") {
				this.usersRepository.update(id, { avatar: filename });
			}
			else {
				unlink("./images/" + user.avatar, () => { console.log("Successfully deleted previous avatar with path ./images/" + user.avatar) });
				this.usersRepository.update(id, { avatar: filename });
			}
		} catch(e) {
			console.log(e.message);
			throw new BadRequestException();
		}
	}

	/*
	**	===================
	**	2FA USER MANAGEMENT
	**	===================
	*/

	/* Function that change the AuthenticationSecret 2FA of the user */
	async setTwoFactorAuthenticationSecret(secret: string, id: number) {
		return this.usersRepository.update(id, { twoFactorAuthenticationSecret: secret });
	}
	
	/* Simply turn on the 2FA */
	async turnOnTwoFactorAuthentication(id: number) {
		return this.usersRepository.update(id, { isTwoFactorAuthenticationEnabled: true });
	}
	
	/* Simply turn off the 2FA */
	async turnOffTwoFactorAuthentication(id: number) {
		return this.usersRepository.update(id, { isTwoFactorAuthenticationEnabled: false });
	}

	/*
	**	=========================================
	**	USERS_REPOSITORY FUNCTION FOR FURTHER USE
	**	=========================================
	*/

	/* Return an user by it's Id (used in invitation channel) */
	async findById(id: string): Promise<User>
	{
		return await this.usersRepository.findOne({relations: ["channels", "blocked", "pending_channels"], where: [{id: id}]});
	}
}