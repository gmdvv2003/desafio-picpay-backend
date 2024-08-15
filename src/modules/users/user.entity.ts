import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Users")
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "full_name", unique: true })
	fullName: string;

	@Column()
	CPF_CNPJ: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column()
	type: string;
}
