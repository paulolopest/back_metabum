import { BaseDatabase } from '../BaseDatabase';
import { TechnicalInformation } from '../../Models/TechnicalInformation';

export class ProductTechInfoData extends BaseDatabase {
	addTI = async (ti: TechnicalInformation) => {
		try {
			await this.connection('metabum_product_technical_information').insert({
				id: ti.getId(),
				product_id: ti.getProductId(),
				title: ti.getTitle(),
				info: ti.getInfo(),
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getProductTI = async (productId: string) => {
		try {
			const response = await this.connection(
				'metabum_product_technical_information'
			).where({
				product_id: productId,
			});
			return response;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteProductTI = async (techInfoId: string) => {
		try {
			await this.connection('metabum_product_technical_information')
				.delete()
				.where({
					id: techInfoId,
				});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteAllProductTI = async (productId: string) => {
		try {
			await this.connection('metabum_product_technical_information')
				.delete()
				.where({
					product_id: productId,
				});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
