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
}
