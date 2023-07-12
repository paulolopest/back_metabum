import { ProductData } from '../data/ProductData';
import { UserData } from '../data/UserData';
import { AuthenticationData } from '../models/AuthenticationData';
import { Product } from '../models/Product';
import { ProductDescription } from '../models/ProductDescription';
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
		brand: string,
		src: string,
		price: number,
		quantity: number,
		tags: string,
		token: string
	) => {
		try {
			if (!token) throw new Error('Login First');

			if (!name) throw new Error('Enter a name');

			if (!brand) throw new Error('Enter a brand');
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
			if (!tags) throw new Error('Enter a tags');

			const userId = this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(userId.id);

			if (identify.role != 'Administrator') {
				throw new Error('Just admin can insert products');
			}
			const id = this.idGenerator.generateId();

			await this.productData.insertProduct(
				new Product(id, name, brand, src, price, quantity, tags)
			);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	addDescription = async (
		token: string,
		productId: string,
		title: string,
		description: string,
		img: string
	) => {
		try {
			if (!token) throw new Error('Login first');
			if (!productId) throw new Error('Enter a product id');
			if (!title) throw new Error('Enter a title');
			if (!description) throw new Error('Enter a description');

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(user.id);

			if (identify.role !== 'Administrator') {
				throw new Error('Just admin can add description');
			}

			const id = this.idGenerator.generateId();

			await this.productData.addDescription(
				new ProductDescription(id, productId, title, description, img)
			);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getDescriptions = async (productId: string) => {
		try {
			if (!productId) throw new Error('Enter a product id');

			const response = await this.productData.getDescriptions(productId);

			return response;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getProducts = async () => {
		try {
			const response = await this.productData.getProducts();

			return response;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getProductById = async (id: string) => {
		try {
			const response = await this.productData.getProductById(id);

			return response;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	editPrice = async (token: string, price: number, productId: string) => {
		try {
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
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	editQuantity = async (
		token: string,
		productId: string,
		quantity: number
	) => {
		try {
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
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	editDescription = async (
		token: string,
		descriptionId: string,
		title?: string,
		description?: string,
		img?: string
	) => {
		try {
			if (!token) throw new Error('Login first');
			if (!descriptionId) throw new Error('Enter a description id');

			const user = this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(user.id);

			if (identify.role !== 'Administrator') {
				throw new Error('Just admins can edit descriptions');
			}

			await this.productData.editDescription(
				descriptionId,

				title,
				description,
				img
			);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteDescription = async (token: string, descriptionId: string) => {
		try {
			if (!token) throw new Error('Login first');
			if (!descriptionId) throw new Error('Enter a description id');

			const user = this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(user.id);

			if (identify.role !== 'Administrator') {
				throw new Error('Just admins can delete descriptions');
			}

			await this.productData.deleteDescription(descriptionId);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteProduct = async (token: string, productId: string) => {
		try {
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
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
