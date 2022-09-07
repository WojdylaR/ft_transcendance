/* eslint-disable prettier/prettier */
/* Import ValidationPipe fom the common core of @nestjs/common */
import { ValidationPipe } from '@nestjs/common';
/* Import NestFacory from the core of @nestjs/core */
import { NestFactory } from '@nestjs/core';
/* Import the AppModule from app.module.ts to retrieve all the module needed for our backend */
import { AppModule } from './app.module';


/*
**	This is the main that gonna execute when we are building the containers from Docker.
**	It say what to enbale, use and listen to work.
*/
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());
	app.enableShutdownHooks();
	await app.listen(3000);
}
bootstrap();