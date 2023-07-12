import { Cart } from '../../Models/Cart';
import { BaseDatabase } from '../BaseDatabase';

export class CartData extends BaseDatabase {
	addProduct = async (cart: Cart) => {
		await this.connection('metabum_cart').insert({
			user_id: cart.getUserId(),
			product_id: cart.getProductId(),
			product_src: cart.getProductSrc(),
			product_name: cart.getProductName(),
			product_price: cart.getProductPrice(),
			quantity: cart.getQuantity(),
		});
	};

	getUserCart = async (id: string) => {
		try {
			const result = await this.connection('metabum_cart').where({
				user_id: id,
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getProductInCart = async (userId: string, productId: string) => {
		try {
			const result = await this.connection('metabum_cart')
				.where({
					user_id: userId,
				})
				.andWhere({ product_id: productId });

			return result[0];
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	editProductQuantity = async (
		userId: string,
		productId: string,
		quantity: number
	) => {
		try {
			await this.connection('metabum_cart')
				.update({
					quantity: quantity,
				})
				.where({ user_id: userId })
				.andWhere({ product_id: productId });
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	removeProduct = async (userId: string, productId: string) => {
		try {
			await this.connection('metabum_cart')
				.delete()
				.where({ user_id: userId })
				.andWhere({ product_id: productId });
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteCart = async (userId: string) => {
		try {
			await this.connection('metabum_cart')
				.delete()
				.where({ user_id: userId });
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
