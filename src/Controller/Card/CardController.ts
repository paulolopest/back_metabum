import { Request, Response } from 'express';
import { CustomError } from '../../Models/CustomError';
import { CardBusiness } from '../../Business/Card/CardBusiness';

export class CardController {
	constructor(private cardBusiness: CardBusiness) {}

	createCard = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { name, number, cvv, validationDate } = req.body;

			await this.cardBusiness.createCard(
				name,
				number,
				cvv,
				validationDate,
				token
			);

			res.status(201).send('The card was successfully registered');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(500).send(error.message);
			}
		}
	};

	getAllCards = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			const response = await this.cardBusiness.getAllCards(token);

			res.status(201).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(500).send(error.message);
			}
		}
	};

	deleteCard = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { cardId } = req.params;

			await this.cardBusiness.deleteCard(token, cardId);

			res.send('Card deleted');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(500).send(error.message);
			}
		}
	};
}
