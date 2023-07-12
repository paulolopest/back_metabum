import * as bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export class HashManager {
	generateHash = async (password: string): Promise<string> => {
		const rounds = Number(process.env.BYCRYPT_COST);
		const salt = await bcrypt.genSalt(rounds);

		return bcrypt.hash(password, salt);
	};

	compareHash = (
		password: string,
		hashedPassword: string
	): Promise<boolean> => {
		return bcrypt.compare(password, hashedPassword);
	};
}
