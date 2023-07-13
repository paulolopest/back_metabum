import { BaseDatabase } from '../BaseDatabase';
import { FavoriteProduct } from '../../Models/FavoriteProduct';

export class FavoriteProductData extends BaseDatabase {
	addProduct = async (product: FavoriteProduct) => {
		try {
			await this.connection('metabum_favorites').insert({
				user_id: product.getUserId(),
				product_id: product.getProductId(),
				product_src: product.getSrc(),
				product_name: product.getName(),
				product_brand: product.getBrand(),
				product_price: product.getPrice(),
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getProducts = async (id: string) => {
		try {
			const response = await this.connection('metabum_favorites').where({
				user_id: id,
			});

			return response;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getProductInFavorites = async (userId: string, productId: string) => {
		try {
			const response = await this.connection('metabum_favorites')
				.where({
					product_id: productId,
				})
				.andWhere({
					user_id: userId,
				});

			return response;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteProduct = async (userId: string, productId: string) => {
		try {
			await this.connection('metabum_favorites')
				.delete()
				.where({
					product_id: productId,
				})
				.andWhere({
					user_id: userId,
				});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
