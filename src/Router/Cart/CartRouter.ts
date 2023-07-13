import express from 'express';
import { CartData } from '../../Data/Cart/CartData';
import { IdGenerator } from '../../Services/IdGenerator';
import { ProductData } from '../../Data/Product/ProductData';
import { Authenticator } from '../../Services/Authenticator';
import { CartBusiness } from '../../Business/Cart/CartBusiness';
import { CartController } from '../../Controller/Cart/CartController';

const cartBusiness = new CartBusiness(
	new Authenticator(),
	new IdGenerator(),
	new ProductData(),
	new CartData()
);
const cartController = new CartController(cartBusiness);

const cartRouter = express.Router();

cartRouter.post('/cart/add/:productId', cartController.addProduct);

cartRouter.get('/cart/user', cartController.getUserCart);

cartRouter.put(
	'/cart/edit-quantity/:productId',
	cartController.editProductQuantity
);

cartRouter.delete('/cart/delete/:productId', cartController.removeProduct);
cartRouter.delete('/cart/delete', cartController.deleteCart);

export default cartRouter;
