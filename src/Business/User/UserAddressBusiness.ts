import { Address } from '../../Models/Address';
import { UserData } from '../../Data/User/UserData';
import { CustomError } from '../../Models/CustomError';
import { IdGenerator } from '../../Services/IdGenerator';
import { Authenticator } from '../../Services/Authenticator';
import { UserAddressData } from '../../Data/User/UserAddressData';

export class UserAddressBusiness {
	constructor(
		private userAddressData: UserAddressData,
		private authenticator: Authenticator,
		private idGenerator: IdGenerator,
		private userData: UserData
	) {}

	addAddress = async (
		token: string,
		zipCode: number,
		identification: string,
		street: string,
		number: number,
		complement: string,
		reference: string,
		neighborhood: string,
		city: string,
		uf: string
	) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			if (!zipCode) throw new CustomError(400, 'Enter a zip code');
			if (!identification)
				throw new CustomError(400, 'Enter a identification');
			if (!street) throw new CustomError(400, 'Enter a street');
			if (!number) throw new CustomError(400, 'Enter a house number');
			if (!neighborhood) throw new CustomError(400, 'Enter a neighborhood');
			if (!city) throw new CustomError(400, 'Enter a city');
			if (!uf) throw new CustomError(400, 'Enter a uf');

			zipCode.toString().replace('-', '');

			const user = this.authenticator.getTokenData(token);

			const existZipCode = await this.userAddressData.getAddressByZipCode(
				user.id,
				zipCode
			);
			if (existZipCode) {
				throw new CustomError(401, 'Zip code already registered');
			}

			const id = this.idGenerator.generateId();

			await this.userAddressData.addAddress(
				new Address(
					id,
					user.id,
					Number(zipCode),
					identification,
					street,
					number,
					complement ? complement : null,
					reference ? reference : null,
					neighborhood,
					city,
					uf
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

	getUserAddress = async (token: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			const user = this.authenticator.getTokenData(token);

			const response = await this.userAddressData.getUserAddress(user.id);

			return response;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getUserDefaultZipCode = async (token: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			const { id } = this.authenticator.getTokenData(token);

			const user = await this.userData.getUserById(id);

			const response = await this.userAddressData.getUserDefaultZipCode(
				user.id,
				user.default_address
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

	deleteUserAddress = async (token: string, addressId: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!addressId) throw new CustomError(400, 'Enter an address id');

			const searchAddress = this.userAddressData.getAddressById(addressId);
			if (!searchAddress) throw new CustomError(401, 'Address not found');

			const user = this.authenticator.getTokenData(token);

			await this.userAddressData.deleteUserAddress(user.id, addressId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
