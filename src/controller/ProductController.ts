import { Request, Response } from 'express';
import { ProductBusiness } from '../business/ProductBusiness';

export class ProductController {
	constructor(private productBusiness: ProductBusiness) {}

	insertProduct = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const { name, src, price, quantity, tags, description } = req.body;
			await this.productBusiness.insertProduct(
				name,
				src,
				price,
				quantity,
				tags,
				description,
				token
			);

			res.status(201).send('Product added to stock');
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	getProducts = async (req: Request, res: Response) => {
		try {
			const response = await this.productBusiness.getProducts();

			res.send(response);
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	getProductById = async (req: Request, res: Response) => {
		try {
			const { id } = req.body;
			const response = await this.productBusiness.getProductById(id);

			res.send(response);
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	editPrice = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const productId = req.params.productId;
			const { price } = req.body;

			await this.productBusiness.editPrice(token, price, productId);

			res.send(`The product price was updated to ${price}`);
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	editQuantity = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const productId = req.params.productId;
			const { quantity } = req.body;

			await this.productBusiness.editQuantity(token, productId, quantity);

			res.status(200).send('The product quantity was updated');
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	deleteProduct = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const productId = req.params.productId;
			const response = await this.productBusiness.deleteProduct(
				token,
				productId
			);

			res.send('Product deleted');
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};
}
