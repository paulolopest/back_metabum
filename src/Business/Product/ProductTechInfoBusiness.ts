import { UserData } from '../../Data/User/UserData';
import { IdGenerator } from '../../Services/IdGenerator';
import { CustomError } from '../../Models/CustomError';
import { Authenticator } from '../../Services/Authenticator';
import { ProductData } from '../../Data/Product/ProductData';
import { AuthenticationData } from '../../Models/AuthenticationData';
import { TechnicalInformation } from '../../Models/TechnicalInformation';
import { ProductTechInfoData } from '../../Data/Product/ProductTechInfoData';

export class ProductTechInfoBusiness {
	constructor(
		private productTechInfoData: ProductTechInfoData,
		private authenticator: Authenticator,
		private userData: UserData,
		private productData: ProductData,
		private idGenerator: IdGenerator
	) {}

	addTI = async (
		token: string,
		productId: string,
		title: string,
		info: JSON
	) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!productId) throw new CustomError(400, 'Enter a product id');
			if (!title) throw new CustomError(400, 'Enter a TI title');
			if (!info) throw new CustomError(400, 'Enter the infos');

			const product = await this.productData.getProductById(productId);
			if (!product) throw new CustomError(404, 'Enter a valid product');

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(user.id);

			if (identify.role !== 'Administrator') {
				throw new CustomError(401, 'Just admin can add description');
			}

			const id: string = this.idGenerator.generateId();

			await this.productTechInfoData.addTI(
				new TechnicalInformation(id, productId, title, info)
			);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getProductTI = async (productId: string) => {
		try {
			if (!productId) throw new CustomError(400, 'Enter a product id');

			const response = await this.productTechInfoData.getProductTI(
				productId
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

	deleteProductTI = async (token: string, techInfoId: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!techInfoId) {
				throw new CustomError(400, 'Enter a technical information id');
			}

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(user.id);

			if (identify.role !== 'Administrator') {
				throw new CustomError(401, 'Just admins can delete descriptions');
			}

			await this.productTechInfoData.deleteProductTI(techInfoId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	deleteAllProductTI = async (token: string, productId: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!productId) {
				throw new CustomError(400, 'Enter a technical information id');
			}

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);
			const identify = await this.userData.getUserById(user.id);

			if (identify.role !== 'Administrator') {
				throw new CustomError(401, 'Just admins can delete descriptions');
			}

			await this.productTechInfoData.deleteAllProductTI(productId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
