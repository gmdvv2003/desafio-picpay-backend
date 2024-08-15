import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserRequest {
	@IsString()
	@IsNotEmpty()
	fullName: string;

	@IsString()
	@IsNotEmpty()
	CPF_CNPJ: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsNotEmpty()
	@IsIn(["payer", "payee"], { message: "Invalid user type" })
	type: string;
}
