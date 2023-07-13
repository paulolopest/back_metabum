import { Request, Response } from 'express';
import { CustomError } from '../../Models/CustomError';
import { ProductBusiness } from '../../Business/Product/ProductBusiness';

export class ProductController {
	constructor(private productBusiness: ProductBusiness) {}

	insertProduct = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { name, brand, src, price, quantity, tags } = req.body;
			await this.productBusiness.insertProduct(
				name,
				brand,
				src,
				price,
				quantity,
				tags,
				token
			);

			res.status(201).send('Product added to stock');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	addDescription = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { title, description, img } = req.body;
			const { productId } = req.params;

			await this.productBusiness.addDescription(
				token,
				productId,
				title,
				description,
				img
			);

			res.status(201).send('Description added');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getDescriptions = async (req: Request, res: Response) => {
		try {
			const { productId } = req.params;
			const response = await this.productBusiness.getDescriptions(productId);

			res.send(response);
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
			const response = await this.productBusiness.getProducts();

			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getProductById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const response = await this.productBusiness.getProductById(id);

			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	editPrice = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;
			const { price } = req.body;

			await this.productBusiness.editPrice(token, price, productId);

			res.status(200).send(`The product price was updated to ${price}`);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	editQuantity = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;
			const { quantity } = req.body;

			await this.productBusiness.editQuantity(token, productId, quantity);

			res.status(200).send('The product quantity was updated');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	editDescription = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { descriptionId } = req.params;
			const { title, description, img } = req.body;

			await this.productBusiness.editDescription(
				token,
				descriptionId,
				title,
				description,
				img
			);

			res.status(200).send('Description updated');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	deleteDescription = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { descriptionId } = req.params;
			await this.productBusiness.deleteDescription(token, descriptionId);

			res.status(204).send();
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
			await this.productBusiness.deleteProduct(token, productId);

			res.status(204).send();
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}