import { IsEmail, IsIn, IsNotEmpty, IsString, Matches } from "class-validator";

export class RegisterUserRequest {
	@IsString()
	@IsNotEmpty()
	fullName: string;

	@IsString()
	@IsNotEmpty()
	@Matches(/^\d{3}.\d{3}.\d{3}-\d{2}$|^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/, { message: "Invalid CPF/CNPJ" })
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
