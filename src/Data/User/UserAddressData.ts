import { Address } from '../../Models/Address';
import { BaseDatabase } from '../BaseDatabase';

export class UserAddressData extends BaseDatabase {
	addAddress = async (ads: Address) => {
		try {
			const query = await this.connection('metabum_user_address').insert({
				id: ads.getId(),
				user_id: ads.getUserId(),
				zip_code: ads.getZipCode(),
				identification: ads.getIdentification(),
				street: ads.getStreet(),
				number: ads.getNumber(),
				complement: ads.getComplement(),
				reference: ads.getReference(),
				neighborhood: ads.getNeighborhood(),
				city: ads.getCity(),
				uf: ads.getUf(),
			});

			const query2 = await this.connection('metabum_users')
				.update({
					default_address: ads.getZipCode(),
				})
				.where({ id: ads.getUserId() });
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getUserAddress = async (userId: string) => {
		try {
			const response = await this.connection('metabum_user_address').where({
				user_id: userId,
			});

			return response;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getAddressByZipCode = async (id: string, zipCode: number) => {
		try {
			const response = await this.connection('metabum_user_address')
				.where({
					zip_code: zipCode,
				})
				.andWhere({
					user_id: id,
				});

			return response[0];
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getUserDefaultZipCode = async (id: string, zipCode: number) => {
		try {
			const response = await this.connection('metabum_user_address')
				.where({
					zip_code: zipCode,
				})
				.andWhere({
					user_id: id,
				});

			return response[0];
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getAddressById = async (id: string) => {
		try {
			const response = await this.connection('metabum_user_address').where({
				id: id,
			});

			return response[0];
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteUserAddress = async (userId: string, addressId: string) => {
		try {
			await this.connection('metabum_user_address')
				.delete()
				.where({
					id: addressId,
				})
				.andWhere({ user_id: userId });
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
