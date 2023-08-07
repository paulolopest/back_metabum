import express, { Router } from 'express';
import { productEvaluationController } from '../../Models/Classes';

export const productEvaluationRouter: Router = express.Router();

//Routes

productEvaluationRouter.post(
	'/product/add-evaluation/:productId',
	productEvaluationController.addEvaluation
);

productEvaluationRouter.get(
	'/product/evaluation/:productId',
	productEvaluationController.getEvaluation
);

productEvaluationRouter.delete(
	'/product/evaluation/delete/:productId',
	productEvaluationController.deleteEvaluation
);
