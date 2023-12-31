import { Request, Response } from 'express';
import { CustomError } from '../../Models/CustomError';
import { UserBusiness } from '../../Business/User/UserBusiness';

export class UserController {
	constructor(private userBusiness: UserBusiness) {}

	signup = async (req: Request, res: Response) => {
		try {
			const { name, email, cpf, password } = req.body;
			const response = await this.userBusiness.signup(
				name,
				email,
				cpf.replaceAll('.', '').replaceAll('-', ''),
				password
			);

			res.status(201).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	login = async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;
			const response = await this.userBusiness.login(email, password);

			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	addDefaultAddress = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const { zipCode } = req.params;

			await this.userBusiness.addDefaultAddress(token, zipCode as string);

			res.status(200).send('Default address updated');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.sqlMessage || error.message);
			}
		}
	};

	validateToken = async (req: Request, res: Response) => {
		try {
			const { token } = req.body;
			await this.userBusiness.validateToken(token);

			res.status(200).send('Valid token');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getProfile = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const response = await this.userBusiness.getProfile(token);

			console.log(response);
			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	editProfileName = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { name } = req.body;

			await this.userBusiness.editProfileName(token, name);

			res.status(200).send(`Name successfully update for ${name}`);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	editPassword = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { currentPassword, newPassword } = req.body;

			await this.userBusiness.editPassword(
				token,
				currentPassword,
				newPassword
			);

			res.status(200).send(`Password successfully updated`);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	editEmail = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { currentEmail, newEmail, password } = req.body;

			await this.userBusiness.editEmail(
				token,
				currentEmail,
				newEmail,
				password
			);

			res.status(200).send(`Email successfully updated`);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	deleteUser = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			await this.userBusiness.deleteUser(token);

			res.status(200).send('User deleted');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
