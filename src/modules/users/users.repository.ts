import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { User } from "./user.entity";

import { RegisterUserResponse } from "./dto/RegisterUserResponse";
import { RegisterUserRequest } from "./dto/RegisterUserRequest";

@Injectable()
export class UsersRepository extends Repository<User> {
	constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {
		super(usersRepository.target, usersRepository.manager, usersRepository.queryRunner);
	}

	/**
	 * Returns whether a user with the given CPF_CNPJ or email exists in the database
	 *
	 * @param CPF_CNPJ (optional) CPF_CNPJ to be checked
	 * @param email (optional) Email to be checked
	 * @returns If the user exists
	 */
	public async userExists(CPF_CNPJ?: string, email?: string): Promise<boolean> {
		if (CPF_CNPJ == undefined && email == undefined) {
			throw new Error("CPF_CNPJ or email must be provided");
		}

		return !!(await this.usersRepository.findOne({ where: [{ CPF_CNPJ }, { email }] }));
	}

	/**
	 * Register a new user in the database
	 *
	 * @param user User to be registered
	 * @returns Registered user
	 */
	public async registerUser(user: RegisterUserRequest): Promise<RegisterUserResponse> {
		return this.usersRepository.save(user);
	}
}
