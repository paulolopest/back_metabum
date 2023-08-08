import { User } from '../../Models/User';
import { UserData } from '../../Data/User/UserData';
import { CustomError } from '../../Models/CustomError';
import { HashManager } from '../../Services/HashManager';
import { IdGenerator } from '../../Services/IdGenerator';
import { Authenticator } from '../../Services/Authenticator';
import { AuthenticationData } from '../../Models/AuthenticationData';

export class UserBusiness {
	constructor(
		private authenticator: Authenticator,
		private hashManager: HashManager,
		private idGenerator: IdGenerator,
		private userData: UserData
	) {}

	signup = async (
		name: string,
		email: string,
		cpf: string,
		password: string
	) => {
		try {
			if (!name) throw new CustomError(400, 'Enter a name');

			if (!email) throw new CustomError(400, 'Enter an email');

			const user = await this.userData.getUserByEmail(email);
			if (user) throw new CustomError(409, 'User already exist');

			if (!cpf) throw new CustomError(400, 'Enter a CPF');
			if (cpf.length !== 11) {
				throw new CustomError(400, 'The CPF must be equal 11 characters');
			}

			const cpfVerify = await this.userData.getUserByCpf(cpf);
			if (cpfVerify) {
				throw new CustomError(409, 'The cpf is already registered');
			}

			if (!password) {
				throw new CustomError(400, 'Enter a password');
			} else if (password.length < 8) {
				throw new CustomError(
					400,
					'The password must be longer than 6 characters'
				);
			}

			const id: string = this.idGenerator.generateId();
			const hashedPassword: string = await this.hashManager.generateHash(
				password
			);

			await this.userData.signup(
				new User(id, name, email, hashedPassword, cpf, 'Normal')
			);

			const token: string = this.authenticator.generateToken({ id: id });

			return token;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	login = async (email: string, password: string) => {
		try {
			if (!email) throw new CustomError(400, 'Enter an email');

			if (!password) {
				throw new CustomError(400, 'Enter a password');
			} else if (password.length < 8) {
				throw new CustomError(400, 'Invalid Password');
			}

			const user = await this.userData.getUserByEmail(email);
			if (!user) {
				throw new CustomError(404, 'Account does not exist');
			}

			const validatePassword: boolean = await this.hashManager.compareHash(
				password,
				user.password
			);
			if (!validatePassword) {
				throw new CustomError(401, 'Incorrect password');
			}

			const token: string = this.authenticator.generateToken({
				id: user.id,
			});

			return token;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	addDefaultAddress = async (token: string, zipCode: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			if (!zipCode) throw new CustomError(400, 'Enter a zip code');

			const { id } = this.authenticator.getTokenData(token);
			const user = await this.userData.getUserById(id);

			if (user.zipCode === zipCode)
				throw new CustomError(409, 'This zip code already is the default');

			await this.userData.addDefaultAddress(id, zipCode);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	validateToken = async (token: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			const validateToken: AuthenticationData =
				this.authenticator.getTokenData(token);

			if (!validateToken) throw new CustomError(401, 'Invalid credentials');
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getProfile = async (token: string): Promise<string[]> => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			const userId: AuthenticationData =
				this.authenticator.getTokenData(token);

			const response = await this.userData.getProfile(userId.id);

			return response;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	editProfileName = async (token: string, name: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			if (!name) throw new CustomError(400, 'Enter a name');

			const userId: AuthenticationData =
				this.authenticator.getTokenData(token);

			await this.userData.editProfileName(userId.id, name);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	editEmail = async (
		token: string,
		currentEmail: string,
		newEmail: string,
		password: string
	) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			if (!currentEmail)
				throw new CustomError(400, 'Enter the current email');

			if (!newEmail) throw new CustomError(400, 'Enter a new email');

			if (!password) throw new CustomError(400, 'Enter a password');

			if (newEmail === currentEmail)
				throw new CustomError(409, 'You can not use the same email');

			const verifyEmail = await this.userData.getUserByEmail(currentEmail);
			if (!verifyEmail)
				throw new CustomError(409, 'Incorrect current email');

			const verifyNewEmail = await this.userData.getUserByEmail(newEmail);
			if (verifyNewEmail)
				throw new CustomError(
					409,
					'The new email already exist in our system'
				);

			const { id } = this.authenticator.getTokenData(token);

			const user = await this.userData.getUserById(id);

			const verifyPassword = await this.hashManager.compareHash(
				password,
				user.password
			);

			if (!verifyPassword) throw new CustomError(401, 'Incorrect password');

			await this.userData.editEmail(id, newEmail);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	editPassword = async (
		token: string,
		currentPassword: string,
		newPassword: string
	) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			if (!currentPassword)
				throw new CustomError(400, 'Enter the current password');

			if (!newPassword) {
				throw new CustomError(400, 'Enter a new password');
			} else if (newPassword.length < 8) {
				throw new CustomError(
					400,
					'The new password must be longer than 6 characters'
				);
			}

			const userId: AuthenticationData =
				this.authenticator.getTokenData(token);

			const user = await this.userData.getUserById(userId.id);
			if (!user) throw new CustomError(409, 'User not exist');

			const verifyPassword: boolean = await this.hashManager.compareHash(
				currentPassword,
				user.password
			);
			if (!verifyPassword) throw new CustomError(401, 'Incorrect password');

			const hashPassword: string = await this.hashManager.generateHash(
				newPassword
			);

			await this.userData.editPassword(userId.id, hashPassword);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	deleteUser = async (token: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			const userId: AuthenticationData =
				this.authenticator.getTokenData(token);

			await this.userData.deleteUser(userId.id);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
