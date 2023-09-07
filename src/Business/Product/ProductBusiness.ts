import { Product } from '../../Models/Product';
import { UserData } from '../../Data/User/UserData';
import { CustomError } from '../../Models/CustomError';
import { IdGenerator } from '../../Services/IdGenerator';
import { Authenticator } from '../../Services/Authenticator';
import { ProductData } from '../../Data/Product/ProductData';
import { AuthenticationData } from '../../Models/AuthenticationData';
import { ProductDescription } from '../../Models/ProductDescription';

export class ProductBusiness {
	constructor(
		private authenticator: Authenticator,
		private idGenerator: IdGenerator,
		private productData: ProductData,
		private userData: UserData
	) {}

	addImg = async (token: string, productId: string, img: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!productId) throw new CustomError(400, 'Enter a product id');
			if (!img) throw new CustomError(400, 'Enter a small image');

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(user.id);

			if (identify.role !== 'Administrator') {
				throw new CustomError(401, 'Just admin can add description');
			}

			const id: string = this.idGenerator.generateId();

			await this.productData.addImg(id, productId, img);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	insertProduct = async (
		name: string,
		brand: string,
		src: string,
		price: number,
		quantity: number,
		tags: string,
		department: string,
		token: string
	) => {
		try {
			if (!token) throw new CustomError(401, 'Login First');
			if (!name) throw new CustomError(400, 'Enter a name');
			if (!brand) throw new CustomError(400, 'Enter a brand');
			if (!tags) throw new CustomError(400, 'Enter a tags');

			if (!src) {
				throw new CustomError(400, 'Enter a link for an image');
			} else if (src.indexOf('https://') === -1) {
				throw new CustomError(400, 'Enter a valid link');
			}

			if (!price) {
				throw new CustomError(400, 'Enter a price');
			} else if (price <= 0) {
				throw new CustomError(400, 'Enter a valid price');
			}

			if (!quantity) {
				throw new CustomError(400, 'Enter a quantity');
			} else if (quantity <= 0) {
				throw new CustomError(400, 'Enter a valid quantity');
			}

			const userId: AuthenticationData =
				this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(userId.id);

			if (identify.role != 'Administrator') {
				throw new CustomError(401, 'Just admin can insert products');
			}
			const id: string = this.idGenerator.generateId();
			const photoId: string = this.idGenerator.generateId();

			await this.productData.insertProduct(
				new Product(id, name, brand, src, price, quantity, tags, department)
			);

			await this.productData.addImg(photoId, id, src);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
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
			if (!token) throw new CustomError(401, 'Login first');
			if (!productId) throw new CustomError(400, 'Enter a product id');
			if (!title) throw new CustomError(400, 'Enter a title');
			if (!description) throw new CustomError(400, 'Enter a description');

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(user.id);

			if (identify.role !== 'Administrator') {
				throw new CustomError(401, 'Just admin can add description');
			}

			const id: string = this.idGenerator.generateId();

			await this.productData.addDescription(
				new ProductDescription(id, productId, title, description, img)
			);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getProductImgs = async (productId: string) => {
		try {
			if (!productId) throw new CustomError(400, 'Enter a product id');

			const response = await this.productData.getProductImgs(productId);

			return response;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getDescriptions = async (productId: string) => {
		try {
			if (!productId) throw new CustomError(400, 'Enter a product id');

			const response = await this.productData.getDescriptions(productId);

			return response;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getProducts = async (orderBy?: string, limit?: number) => {
		try {
			const response = await this.productData.getProducts(
				orderBy as string,
				limit as number
			);

			return response;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getFilteredCatalog = async (
		word: string,
		name?: string,
		brand?: string,
		department?: string,
		order?: string,
		by?: string,
		limit?: number
	) => {
		try {
			const response = await this.productData.getFilteredCatalog(
				word,
				name,
				brand,
				department,
				order,
				by,
				limit
			);

			return response;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getProductById = async (id: string) => {
		try {
			if (!id) throw new CustomError(400, 'Enter a product id');
			const response = await this.productData.getProductById(id);

			return response;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getProductByBrand = async (brand: string) => {
		try {
			if (!brand) throw new CustomError(400, 'Enter a product brand');
			const result = await this.productData.getProductByBrand(brand);

			return result;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	editPrice = async (token: string, price: number, productId: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!productId) throw new CustomError(400, 'Enter a product id');
			if (!price) throw new CustomError(400, 'Enter a price');

			const userId: AuthenticationData =
				this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(userId.id);

			if (identify.role != 'Administrator') {
				throw new CustomError(401, 'Just administrator can edit the price');
			}
			await this.productData.editPrice(price, productId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	editQuantity = async (
		token: string,
		productId: string,
		quantity: number
	) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!productId) throw new CustomError(400, 'Enter a product id');
			if (!quantity) throw new CustomError(400, 'Enter a quantity');

			const { id } = this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(id);

			if (identify.role != 'Administrator') {
				throw new CustomError(401, 'Only admins can edit the quantity');
			}

			await this.productData.editQuantity(productId, quantity);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
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
			if (!token) throw new CustomError(401, 'Login first');
			if (!descriptionId)
				throw new CustomError(400, 'Enter a description id');

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(user.id);

			if (identify.role !== 'Administrator') {
				throw new CustomError(401, 'Just admins can edit descriptions');
			}

			await this.productData.editDescription(
				descriptionId,

				title,
				description,
				img
			);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	deleteProductImg = async (token: string, id: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!id) {
				throw new CustomError(400, 'Enter a image id');
			}

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(user.id);

			if (identify.role !== 'Administrator') {
				throw new CustomError(401, 'Just admins can delete descriptions');
			}

			await this.productData.deleteProductImg(id);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	deleteDescription = async (token: string, descriptionId: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!descriptionId) {
				throw new CustomError(400, 'Enter a description id');
			}

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(user.id);

			if (identify.role !== 'Administrator') {
				throw new CustomError(401, 'Just admins can delete descriptions');
			}

			await this.productData.deleteDescription(descriptionId);
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

			const userId: AuthenticationData =
				this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(userId.id);

			if (identify.role != 'Administrator') {
				throw new CustomError(401, 'Just admin can delete product');
			}

			await this.productData.deleteProduct(productId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
