/* Import Module from the common core of @nestjs/common */
import { Module } from "@nestjs/common";
/* Import TypeOrmModule from @nestjs/typeorm to handle the database injection */
import { TypeOrmModule } from "@nestjs/typeorm";
/* Import Config from @nestjs/config to simply configure the file for the db */
import { ConfigModule, ConfigService } from "@nestjs/config";


/*
**  This module here is for the database importation.
**  It gonna get the informations from the .env to connect to the postgres database.
**  /!\ WARNING /!\ 
**  This is obviously an important module if you want to import from your *.entity.ts and have a clear database.
*/
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				// type:			'postgres',
				// host:			configService.get('POSTGRES_HOST'),
				// port:			configService.get('POSTGRES_PORT'),
				// username:		configService.get('POSTGRES_USER'),
				// password:		configService.get('POSTGRES_PASSWORD'),
				// database:		configService.get('POSTGRES_DB'),
				// //entities:		[ "dist/**/**.entity{.ts,.js}" ],
				// //entities: [__dirname + '/../**/*.entity.ts',],
				// "entities": [
				// 	__dirname + "entities/**/*.entity.ts"
				//   ],
				// synchronize:	true

				type: 'postgres',
   				host: 'postgres',
   				port: 5432,
   				username: 'root',
   				password: 'password',
   				database: 'ft_transcendence',
   				autoLoadEntities: true,
   				synchronize: true,
			})
		})
	]
})
export class DatabaseModule {}