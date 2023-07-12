import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { AuthenticationData } from '../Models/AuthenticationData';

dotenv.config();

export class Authenticator {
	generateToken = (id: AuthenticationData): string => {
		return jwt.sign(id, process.env.SECRET_KEY as jwt.Secret, {
			expiresIn: process.env.SECRET_EXPIRE,
		});
	};

	getTokenData = (token: string): AuthenticationData => {
		return jwt.verify(
			token,
			process.env.SECRET_KEY as jwt.Secret
		) as AuthenticationData;
	};
}
