import { Request, Response } from 'express';
import { CustomError } from '../../Models/CustomError';
import { ProductTechInfoBusiness } from '../../Business/Product/ProductTechInfoBusiness';

export class ProductTechInfoController {
	constructor(private productTechInfoBusiness: ProductTechInfoBusiness) {}

	addTI = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;
			const { title, info } = req.body;

			await this.productTechInfoBusiness.addTI(
				token,
				productId,
				title,
				info
			);

			res.status(201).send('Technical information added');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getProductTI = async (req: Request, res: Response) => {
		try {
			const { productId } = req.params;

			const response = await this.productTechInfoBusiness.getProductTI(
				productId
			);

			// res.setHeader('Cache-Control', 'public, max-age=43200');
			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	deleteProductTI = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { id } = req.params;

			await this.productTechInfoBusiness.deleteProductTI(token, id);

			res.status(200).send('Technical information deleted');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	deleteAllProductTI = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;

			await this.productTechInfoBusiness.deleteAllProductTI(
				token,
				productId
			);

			res.status(200).send('All Technical information deleted');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
