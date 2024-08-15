import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersModule } from "./modules/users/users.module";

@Module({
	imports: [
		// Modules
		UsersModule,

		// Environment variables
		ConfigModule.forRoot({
			isGlobal: true,
		}),

		// TypeORM configuration
		TypeOrmModule.forRoot({
			type: "mysql",
			database: process.env.DATABASE_NAME,
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			dropSchema: true,
			synchronize: true,
			logging: true,
			migrations: [__dirname + "/database/migrations/*{.ts,.js}"],
			entities: [__dirname + "/**/*.entity{.ts,.js}"],
		}),
	],
})
export class AppModule {}
