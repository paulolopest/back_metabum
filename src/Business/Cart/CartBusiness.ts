import { Cart } from '../../Models/Cart';
import { CartData } from '../../Data/Cart/CartData';
import { CustomError } from '../../Models/CustomError';
import { IdGenerator } from '../../Services/IdGenerator';
import { Authenticator } from '../../Services/Authenticator';
import { ProductData } from '../../Data/Product/ProductData';
import { AuthenticationData } from '../../Models/AuthenticationData';

export class CartBusiness {
	constructor(
		private authenticator: Authenticator,
		private idGenerator: IdGenerator,
		private productData: ProductData,
		private cartData: CartData
	) {}

	addProduct = async (token: string, productId: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!productId) throw new CustomError(400, 'Enter a product id');

			const product = await this.productData.getProductById(productId);
			if (!product) {
				throw new CustomError(409, 'Enter a valid product');
			}

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);

			const getFilteredCatalog = await this.cartData.getProductInCart(
				user.id,
				productId
			);
			if (!getFilteredCatalog) {
				await this.cartData.addProduct(
					new Cart(
						user.id,
						productId,
						product.src,
						product.name,
						product.price,
						1
					)
				);
			} else {
				await this.cartData.editProductQuantity(
					user.id,
					productId,
					getFilteredCatalog.quantity + 1
				);
			}
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getUserCart = async (token: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			const { id } = this.authenticator.getTokenData(token);

			const result = await this.cartData.getUserCart(id);

			return result;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	editProductQuantity = async (
		token: string,
		productId: string,
		quantity: number
	) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!productId) throw new CustomError(400, 'Enter a product id');

			if (!quantity) {
				throw new CustomError(400, 'Enter a quantity');
			} else if (quantity <= 0) {
				throw new CustomError(400, 'Enter a valid quantity');
			}

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);

			await this.cartData.editProductQuantity(user.id, productId, quantity);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	removeProduct = async (token: string, productId: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!productId) throw new CustomError(400, 'Enter a product id');

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);

			await this.cartData.removeProduct(user.id, productId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	deleteCart = async (token: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);

			await this.cartData.deleteCart(user.id);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
