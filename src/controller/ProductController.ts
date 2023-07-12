import { Request, Response } from 'express';
import { ProductBusiness } from '../business/ProductBusiness';

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
			res.status(500).send(error.message || error.sqlMessage);
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
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	getDescriptions = async (req: Request, res: Response) => {
		try {
			const { productId } = req.params;
			const response = await this.productBusiness.getDescriptions(productId);

			res.send(response);
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
			const { id } = req.params;
			const response = await this.productBusiness.getProductById(id);

			res.send(response);
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	editPrice = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
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
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;
			const { quantity } = req.body;

			await this.productBusiness.editQuantity(token, productId, quantity);

			res.status(200).send('The product quantity was updated');
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
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
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	deleteDescription = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { descriptionId } = req.params;
			await this.productBusiness.deleteDescription(token, descriptionId);

			res.status(200).send('Description successfully deleted');
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	deleteProduct = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const productId = req.params.productId;
			await this.productBusiness.deleteProduct(token, productId);

			res.status(200).send('Product successfully deleted');
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};
}
