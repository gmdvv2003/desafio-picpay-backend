import { BadRequestException, Injectable } from "@nestjs/common";

import { UsersRepository } from "./users.repository";

import { RegisterUserRequest } from "./dto/RegisterUserRequest";
import { RegisterUserResponse } from "./dto/RegisterUserResponse";

import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	/**
	 * Register a new user
	 *
	 * @param user User to be registered
	 * @returns Registered user
	 */
	async registerUser(dto: RegisterUserRequest): Promise<RegisterUserResponse> {
		const { CPF_CNPJ, email } = dto;

		// Check if the user already exists
		if (await this.usersRepository.userExists(CPF_CNPJ, email)) {
			throw new BadRequestException("CPF/CNPJ or email already in use");
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(dto.password, Number(process.env.SALT_ROUNDS)).catch(() => {
			throw new BadRequestException("Failed to hash password");
		});

		return this.usersRepository.registerUser({ ...dto, password: hashedPassword });
	}
}
