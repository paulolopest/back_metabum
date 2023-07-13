import express, { Router } from 'express';
import { favoriteProductController } from '../../Models/Classes';

export const favoriteProductRouter: Router = express.Router();

//Routes

favoriteProductRouter.post(
	'/:productId/add/favorites',
	favoriteProductController.addProduct
);

favoriteProductRouter.get('/favorites', favoriteProductController.getProducts);

favoriteProductRouter.delete(
	'/favorites/:productId/delete',
	favoriteProductController.deleteProduct
);
