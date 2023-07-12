import { CustomError } from '../../Models/CustomError';
import { IdGenerator } from '../../Services/IdGenerator';
import { ProductData } from '../../Data/Product/ProductData';
import { Authenticator } from '../../Services/Authenticator';
import { FavoriteProduct } from '../../Models/FavoriteProduct';
import { AuthenticationData } from '../../Models/AuthenticationData';
import { FavoriteProductData } from '../../Data/FavoriteProduct/FavoriteProductData';

export class FavoriteProductBusiness {
	constructor(
		private favoriteProductData: FavoriteProductData,
		private authenticator: Authenticator,
		private idGenerator: IdGenerator,
		private productData: ProductData
	) {}

	addProduct = async (
		token: string,
		productId: string,
		src: string,
		name: string,
		brand: string,
		price: number
	) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!productId) throw new CustomError(400, 'Enter a product id');
			if (!src) throw new CustomError(400, 'Enter a image for the product');
			if (!name) throw new CustomError(400, 'Enter a name');
			if (!brand) throw new CustomError(400, 'Enter a brand');
			if (!price) throw new CustomError(400, 'Enter a price');

			const product = await this.productData.getProductById(productId);
			if (!product) throw new CustomError(404, 'Enter a valid product');

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);

			await this.favoriteProductData.addProduct(
				new FavoriteProduct(user.id, productId, src, name, brand, price)
			);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getProducts = async (token: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);

			const response = await this.favoriteProductData.getProducts(user.id);

			return response;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	deleteProduct = async (token: string, productId: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!productId) throw new CustomError(400, 'Enter a product id');

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);

			const search = this.favoriteProductData.getProductInFavorites(
				user.id,
				productId
			);

			if (!search) throw new Error('Product does not exist in favorites');

			await this.favoriteProductData.deleteProduct(user.id, productId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
