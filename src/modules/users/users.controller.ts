import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { UsersService } from "./users.service";

import { RegisterUserRequest } from "./dto/RegisterUserRequest";
import { RegisterUserResponse } from "./dto/RegisterUserResponse";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() dto: RegisterUserRequest): Promise<RegisterUserResponse> {
		return plainToInstance(RegisterUserResponse, await this.usersService.registerUser(dto));
	}
}
