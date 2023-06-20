import { CartData } from '../data/CartData';
import { Authenticator } from './../services/Authenticator';
import { IdGenerator } from './../services/IdGenerator';
import { ProductData } from '../data/ProductData';
import { Cart } from '../models/Cart';

export class CartBusiness {
	constructor(
		private authenticator: Authenticator,
		private idGenerator: IdGenerator,
		private productData: ProductData,
		private cartData: CartData
	) {}

	addProduct = async (token: string, productId: string, quantity: number) => {
		try {
			if (!token) {
				throw new Error('Login first');
			}
			if (!productId) {
				throw new Error('Enter a product id');
			}
			if (!quantity) {
				throw new Error('Enter a quantity');
			} else if (quantity <= 0) {
				throw new Error('Enter a valid quantity');
			}

			const product = this.productData.getProductById(productId);
			if (!product) {
				throw new Error('Enter a valid product');
			}

			const user = this.authenticator.getTokenData(token);
			const cartId = this.idGenerator.generateId();

			await this.cartData.addProduct(
				new Cart(cartId, user.id, productId, quantity)
			);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
