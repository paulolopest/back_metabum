import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';

export class UserController {
	constructor(private userBusiness: UserBusiness) {}

	signup = async (req: Request, res: Response) => {
		try {
			const { name, email, cpf, password } = req.body;
			const response = await this.userBusiness.signup(
				name,
				email,
				cpf,
				password
			);

			res.status(201).send(response);
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	login = async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;
			const response = await this.userBusiness.login(email, password);

			res.status(200).send(response);
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	getProfile = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const response = await this.userBusiness.getProfile(token);

			res.send(response);
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	editProfileName = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const { name } = req.body;

			const response = await this.userBusiness.editProfileName(token, name);

			res.send(`Name successfully update for ${name}`);
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	deleteUser = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const response = await this.userBusiness.deleteUser(token);

			console.log(response);
			res.send('User deleted');
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};
}
