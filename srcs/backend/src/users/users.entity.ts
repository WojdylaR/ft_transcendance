/* eslint-disable prettier/prettier */
/* Import pour la création de la base de données. 
   NestJS utilise typeorm pour créer et injecter la base de données. */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BaseEntity, OneToMany } from 'typeorm';


/*  USER TABLE */
@Entity()
export class User extends BaseEntity
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column({ nullable: true })
	password: string;

	@Column({ default: "regular" })
	is_admin: string;

	@Column({ default: false })
	is_blocked: boolean;

	@Column({ default: "default" })
	avatar: string;

	@Column({ type: "integer", nullable: true, default: 500})
	score: number

	@Column({ default: 'offline' })
	status: string;

	@ManyToMany(() => User, (user: User) => user.blocked)
	@JoinTable({ name: "blocked_users" })
	blocked: User[];

	@Column({ default: false })
	isTwoFactorAuthenticationEnabled?: boolean

	@Column({ nullable: true})
	twoFactorAuthenticationSecret?: string;

	@Column({ default: "filler" })
	displayname?: string;

	@Column({ default: 0 })
	wins: number;
	
	@Column({ default: 0 })
	loses: number;
	
	@Column({ default: 'none' })
	roomId: string;

	toPublic()
	{
		return {
			id: this.id,
			username: this.username,
			avatar: this.avatar,
			score: this.score,
			status: this.status,
			displayname: this.displayname
		}
	}
};