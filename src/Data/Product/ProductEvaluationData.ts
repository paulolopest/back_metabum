import { ProductEvaluation } from '../../Models/ProductEvaluation';
import { BaseDatabase } from '../BaseDatabase';

export class ProductEvaluationData extends BaseDatabase {
	addEvaluation = async (pr: ProductEvaluation) => {
		try {
			await this.connection('metabum_product_evaluation').insert({
				id: pr.getId(),
				product_id: pr.getProductId(),
				user_id: pr.getUserId(),
				rating: pr.getRating(),
				pros: pr.getPros(),
				cons: pr.getCons(),
				description: pr.getDescription(),
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getEvaluation = async (productId: string) => {
		try {
			const result = await this.connection(
				'metabum_product_evaluation'
			).where({
				product_id: productId,
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	searchUserRating = async (userId: string, productId: string) => {
		try {
			const result = await this.connection('metabum_product_evaluation')
				.where({ user_id: userId })
				.andWhere({ product_id: productId });

			return result[0];
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	searchEvaluationById = async (id: string) => {
		try {
			const result = await this.connection(
				'metabum_product_evaluation'
			).where({ product_id: id });

			return result[0];
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteEvaluation = async (productId: string, userId: string) => {
		try {
			await this.connection('metabum_product_evaluation')
				.delete()
				.where({ product_id: productId })
				.andWhere({ user_id: userId });
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
