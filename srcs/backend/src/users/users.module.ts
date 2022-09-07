/* eslint-disable prettier/prettier */
/* Import the common core of nestjs */
import { Module } from '@nestjs/common';
/* Import the function needed for the user's interaction with the website 
** Use for the instantiation and provide to other module the imports it make */
import { UsersService } from './users.service';
/* Import for the database */
import { TypeOrmModule } from '@nestjs/typeorm';
/* Import User table */
import { User } from './users.entity';
/* Import the set of controllers defined in this module which have to be instantiated */
import { UserController } from './users.controller';

/*
**	Regroup and allows to import and export the function of the methods needed.
*/
@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UsersService],
	controllers: [UserController],
	exports: [UsersService]
})
export class UsersModule {}
