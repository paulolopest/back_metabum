import { Cart } from '../models/Cart';
import { BaseDatabase } from './BaseDatabase';

export class CartData extends BaseDatabase {
	addProduct = async (cart: Cart) => {
		await this.connection('metabum_cart').insert({
			id: cart.getId(),
			user_id: cart.getUserId(),
			product_id: cart.getProductId(),
			quantity: cart.getQuantity(),
		});
	};
}
