import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { CustomError } from '../Models/CustomError';
import { AuthenticationData } from '../Models/AuthenticationData';

dotenv.config();

export class Authenticator {
	generateToken = (id: AuthenticationData): string => {
		return jwt.sign(id, process.env.SECRET_KEY as jwt.Secret, {
			expiresIn: process.env.SECRET_EXPIRE,
		});
	};

	getTokenData = (token: string): AuthenticationData => {
		try {
			return jwt.verify(
				token,
				process.env.SECRET_KEY as jwt.Secret
			) as AuthenticationData;
		} catch (error: any) {
			if (error.name === 'TokenExpiredError') {
				throw new CustomError(409, 'Expired token, login again');
			} else if (error.name === 'JsonWebTokenError') {
				throw new CustomError(409, 'Invalid token, login again');
			} else {
				throw new CustomError(404, 'Unknown validation error, login again');
			}
		}
	};
}
