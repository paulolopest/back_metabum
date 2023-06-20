import { ProductData } from '../data/ProductData';
import { UserData } from '../data/UserData';
import { Product } from '../models/Product';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';

export class ProductBusiness {
	constructor(
		private authenticator: Authenticator,
		private idGenerator: IdGenerator,
		private productData: ProductData,
		private userData: UserData
	) {}

	insertProduct = async (
		name: string,
		src: string,
		price: number,
		quantity: number,
		tags: string,
		description: string,
		token: string
	) => {
		if (!token) {
			throw new Error('Login First');
		}
		if (!name) {
			throw new Error('Enter a name');
		}
		if (!src) {
			throw new Error('Enter a link for an image');
		} else if (src.indexOf('https://') === -1) {
			throw new Error('Enter a valid link');
		}
		if (!price) {
			throw new Error('Enter a price');
		} else if (price <= 0) {
			throw new Error('Enter a valid price');
		}
		if (!quantity) {
			throw new Error('Enter a quantity');
		} else if (quantity <= 0) {
			throw new Error('Enter a valid quantity');
		}
		if (!tags) {
			throw new Error('Enter a tags');
		}
		if (!description) {
			throw new Error('Enter a description');
		}

		const userId = this.authenticator.getTokenData(token);
		const identify = await this.userData.getUserById(userId.id);

		if (identify.role != 'Administrator') {
			throw new Error('Just admin can insert products');
		}
		const id = this.idGenerator.generateId();

		await this.productData.insertProduct(
			new Product(id, name, src, price, quantity, tags, description)
		);
	};

	getProducts = async (productName: string) => {
		if (!productName) {
			const response = await this.productData.getProducts();

			return response;
		}

		if (productName) {
			const result = await this.productData.getProductByName(productName);

			return result;
		}
	};

	editPrice = async (token: string, price: number, productId: string) => {
		if (!token) {
			throw new Error('Login first');
		}
		if (!productId) {
			throw new Error('Enter a product id');
		}
		if (!price) {
			throw new Error('Enter a price');
		}

		const userId = this.authenticator.getTokenData(token);
		const identify = await this.userData.getUserById(userId.id);

		if (identify.role != 'Administrator') {
			throw new Error('Just administrator can edit the price');
		}
		await this.productData.editPrice(price, productId);
	};

	editQuantity = async (
		token: string,
		productId: string,
		quantity: number
	) => {
		if (!token) {
			throw new Error('Login first');
		}
		if (!productId) {
			throw new Error('Enter a product id');
		}
		if (!quantity) {
			throw new Error('Enter a quantity');
		}

		const { id } = this.authenticator.getTokenData(token);
		const identify = await this.userData.getUserById(id);

		if (identify.role != 'Administrator') {
			throw new Error('Only admins can edit the quantity');
		}

		await this.productData.editQuantity(productId, quantity);
	};

	deleteProduct = async (token: string, productId: string) => {
		if (!token) {
			throw new Error('Login first');
		}
		if (!productId) {
			throw new Error('Enter a product id');
		}

		const userId = this.authenticator.getTokenData(token);
		const identify = await this.userData.getUserById(userId.id);

		if (identify.role != 'Administrator') {
			throw new Error('Just admin can delete product');
		}

		await this.productData.deleteProduct(productId);
	};
}
