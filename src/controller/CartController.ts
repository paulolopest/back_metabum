import { Request, Response } from 'express';
import { CartBusiness } from '../business/CartBusiness';

export class CartController {
	constructor(private cartBusiness: CartBusiness) {}

	addProduct = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const { productId } = req.params;
			const { quantity } = req.body;

			await this.cartBusiness.addProduct(token, productId, quantity);

			res.status(201).send('Product successfully added in cart');
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	getUserCart = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;

			const result = await this.cartBusiness.getUserCart(token);

			res.status(200).send(result);
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};

	editProductQuantity = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const { productId } = req.params;
			const { quantity } = req.body;

			await this.cartBusiness.editProductQuantity(
				token,
				productId,
				quantity
			);

			res.status(200).send('Quantity successfully updated');
		} catch (error: any) {
			res.status(500).send(error.message || error.sqlMessage);
		}
	};
}
