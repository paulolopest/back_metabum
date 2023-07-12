import { Card } from '../../Models/Card';
import { verifyDate } from '../../Utils/Date';
import { CardData } from '../../Data/Card/CardData';
import { CustomError } from '../../Models/CustomError';
import { HashManager } from '../../Services/HashManager';
import { IdGenerator } from '../../Services/IdGenerator';
import { Authenticator } from '../../Services/Authenticator';
import { AuthenticationData } from '../../Models/AuthenticationData';

export class CardBusiness {
	constructor(
		private authenticator: Authenticator,
		private hashManager: HashManager,
		private idGenerator: IdGenerator,
		private cardData: CardData
	) {}

	createCard = async (
		name: string,
		number: string,
		cvv: string,
		validationDate: Date,
		token: string
	) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!name) throw new CustomError(400, 'Enter a name');
			if (!validationDate) {
				throw new CustomError(400, 'Enter a validation date');
			}

			if (!number) {
				throw new CustomError(400, 'Enter a card number');
			} else if (number.length !== 16) {
				throw new CustomError(
					400,
					'Invalid card number. The card must contain 16 characters'
				);
			}

			if (!cvv) {
				throw new CustomError(400, 'Enter a cvv');
			} else if (cvv.length !== 3) {
				throw new CustomError(
					400,
					'Invalid cvv. The cvv must contain 3 characters'
				);
			}

			const isInvalid = await verifyDate(validationDate);
			if (isInvalid) {
				throw new CustomError(400, 'Invalid Date');
			}

			const userId: AuthenticationData =
				this.authenticator.getTokenData(token);
			const cardExist = await this.cardData.validateCard(number, userId.id);

			if (cardExist) {
				throw new CustomError(409, 'Card already registered');
			}

			const id: string = this.idGenerator.generateId();
			const hashedCVV: string = await this.hashManager.generateHash(cvv);

			await this.cardData.createCard(
				new Card(id, name, number, hashedCVV, validationDate, userId)
			);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getAllCards = async (token: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			const userId: AuthenticationData =
				this.authenticator.getTokenData(token);

			const response = await this.cardData.getAllCards(userId.id);

			return response;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	deleteCard = async (token: string, cardId: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			if (!cardId) {
				throw new CustomError(400, 'Enter a card id');
			}

			await this.cardData.deleteCard(cardId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
