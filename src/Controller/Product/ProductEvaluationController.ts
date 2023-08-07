import { Request, Response } from 'express';
import { CustomError } from '../../Models/CustomError';
import { ProductEvaluationBusiness } from '../../Business/Product/ProductEvaluationBusiness';

export class ProductEvaluationController {
	constructor(private productEvaluationBusiness: ProductEvaluationBusiness) {}

	addEvaluation = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;
			const { rating, pros, cons, description } = req.body;

			await this.productEvaluationBusiness.addEvaluation(
				token,
				productId,
				rating,
				pros,
				cons,
				description
			);

			res.status(201).send('Rating successfully added');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getEvaluation = async (req: Request, res: Response) => {
		try {
			const { productId } = req.params;

			const result = await this.productEvaluationBusiness.getEvaluation(
				productId
			);

			res.status(200).send(result);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	deleteEvaluation = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const { productId } = req.params;

			await this.productEvaluationBusiness.deleteEvaluation(
				productId,
				token
			);

			res.status(200).send('Evaluation deleted');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
