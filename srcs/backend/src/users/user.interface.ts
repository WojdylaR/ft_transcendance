/* Import the User table */
import { User } from "./users.entity";

/* Create an object with the User object and a rank */
export interface UserWithRank {
	user: User;
	rank: number;
}
