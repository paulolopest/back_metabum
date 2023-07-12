import { Request, Response } from 'express';
import { CustomError } from '../../Models/CustomError';
import { CartBusiness } from '../../Business/Cart/CartBusiness';

export class CartController {
	constructor(private cartBusiness: CartBusiness) {}

	addProduct = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;

			await this.cartBusiness.addProduct(token, productId);

			res.status(201).send('Product successfully added in cart');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(500).send(error.message);
			}
		}
	};

	getUserCart = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			const response = await this.cartBusiness.getUserCart(token);

			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(500).send(error.message);
			}
		}
	};

	editProductQuantity = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;
			const { quantity } = req.body;

			await this.cartBusiness.editProductQuantity(
				token,
				productId,
				quantity
			);

			res.status(200).send('Quantity successfully updated');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(500).send(error.message);
			}
		}
	};

	removeProduct = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;

			await this.cartBusiness.removeProduct(token, productId);

			res.status(200).send('Product successfully removed');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(500).send(error.message);
			}
		}
	};

	deleteCart = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			await this.cartBusiness.deleteCart(token);

			res.status(200).send('Cart successfully deleted');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(500).send(error.message);
			}
		}
	};
}
