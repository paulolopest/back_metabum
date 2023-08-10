import { UserAddressBusiness } from '../../Business/User/UserAddressBusiness';
import { CustomError } from '../../Models/CustomError';
import { Request, Response } from 'express';

export class UserAddressController {
	constructor(private userAddressBusiness: UserAddressBusiness) {}

	addAddress = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const {
				zipCode,
				identification,
				street,
				number,
				complement,
				reference,
				neighborhood,
				city,
				uf,
			} = req.body;
			await this.userAddressBusiness.addAddress(
				token,
				zipCode,
				identification,
				street,
				number,
				complement,
				reference,
				neighborhood,
				city,
				uf
			);

			res.status(201).send('Address successfully added');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getUserAddress = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;

			const response = await this.userAddressBusiness.getUserAddress(token);

			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getUserDefaultZipCode = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;

			const response = await this.userAddressBusiness.getUserDefaultZipCode(
				token
			);

			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	deleteUserAddress = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const { addressId } = req.params;

			const response = await this.userAddressBusiness.deleteUserAddress(
				token,
				addressId
			);

			res.status(200).send('Address successfully deleted');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
