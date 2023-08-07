import { AuthenticationData } from '../../Models/AuthenticationData';
import { Authenticator } from '../../Services/Authenticator';
import { IdGenerator } from '../../Services/IdGenerator';
import { CustomError } from '../../Models/CustomError';
import { ProductEvaluationData } from '../../Data/Product/ProductEvaluationData';
import { ProductEvaluation } from '../../Models/ProductEvaluation';

export class ProductEvaluationBusiness {
	constructor(
		private productEvaluationData: ProductEvaluationData,
		private authenticator: Authenticator,
		private idGenerator: IdGenerator
	) {}

	addEvaluation = async (
		token: string,
		productId: string,
		rating: number,
		pros: string,
		cons: string,
		description: string
	) => {
		try {
			if (!token) throw new CustomError(401, 'Login First');
			if (!productId) throw new CustomError(400, 'Enter a product id');
			if (!rating) throw new CustomError(400, 'Enter a rating');
			if (!pros) throw new CustomError(400, 'Enter a product pros');
			if (!cons) throw new CustomError(400, 'Enter a product cons');
			if (!description)
				throw new CustomError(400, 'Enter a product description');

			const user: AuthenticationData =
				this.authenticator.getTokenData(token);

			const verifyRating = await this.productEvaluationData.searchUserRating(
				user.id,
				productId
			);

			if (verifyRating)
				throw new Error('You have already rated this product');

			const id: string = this.idGenerator.generateId();

			await this.productEvaluationData.addEvaluation(
				new ProductEvaluation(
					id,
					productId,
					user.id,
					rating,
					pros,
					cons,
					description
				)
			);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getEvaluation = async (productId: string) => {
		try {
			if (!productId) throw new CustomError(400, 'Enter a product id');

			const result = await this.productEvaluationData.getEvaluation(
				productId
			);

			return result;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	deleteEvaluation = async (productId: string, token: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!productId) throw new CustomError(400, 'Enter a product id');

			const { id } = this.authenticator.getTokenData(token);

			const evaluation =
				await this.productEvaluationData.searchEvaluationById(productId);

			if (evaluation.user_id !== id)
				throw new CustomError(409, 'You cant delete this evaluation');

			await this.productEvaluationData.deleteEvaluation(productId, id);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
