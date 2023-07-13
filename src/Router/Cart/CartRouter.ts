import express, { Router } from 'express';
import { cartController } from '../../Models/Classes';

export const cartRouter: Router = express.Router();

cartRouter.post('/cart/add/:productId', cartController.addProduct);

cartRouter.get('/cart/user', cartController.getUserCart);

cartRouter.put(
	'/cart/edit-quantity/:productId',
	cartController.editProductQuantity
);

cartRouter.delete('/cart/delete/:productId', cartController.removeProduct);
cartRouter.delete('/cart/delete', cartController.deleteCart);
