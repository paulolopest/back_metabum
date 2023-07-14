import { Request, Response } from 'express';
import { CustomError } from '../../Models/CustomError';
import { FavoriteProductBusiness } from '../../Business/FavoriteProduct/FavoriteProductBusiness';

export class FavoriteProductController {
	constructor(private favoriteProductBusiness: FavoriteProductBusiness) {}

	addProduct = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;
			const { src, name, brand, price } = req.body;

			await this.favoriteProductBusiness.addProduct(
				token,
				productId,
				src,
				name,
				brand,
				price
			);

			res.status(201).send('Product added to favorite');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getProducts = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			const response = await this.favoriteProductBusiness.getProducts(token);

			res.setHeader('Cache-Control', 'public, max-age=43200');
			res.status(201).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	deleteProduct = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;

			await this.favoriteProductBusiness.deleteProduct(token, productId);

			res.status(200).send('Product deleted from favorite');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
