import { Exclude, Expose } from "class-transformer";

@Exclude()
export class RegisterUserResponse {
	@Expose() fullName: string;
	@Expose() CPF_CNPJ: string;
	@Expose() email: string;
	@Expose() type: string;
}
