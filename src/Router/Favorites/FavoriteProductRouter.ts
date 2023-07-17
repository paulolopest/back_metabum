import express, { Router } from 'express';
import { IdGenerator } from '../../Services/IdGenerator';
import { ProductData } from '../../Data/Product/ProductData';
import { Authenticator } from '../../Services/Authenticator';
import { FavoriteProductData } from '../../Data/FavoriteProduct/FavoriteProductData';
import { FavoriteProductBusiness } from '../../Business/FavoriteProduct/FavoriteProductBusiness';
import { FavoriteProductController } from '../../Controller/FavoriteProduct/FavoriteProductController';

const favoriteProductBusiness: FavoriteProductBusiness =
	new FavoriteProductBusiness(
		new FavoriteProductData(),
		new Authenticator(),
		new IdGenerator(),
		new ProductData()
	);
const favoriteProductController: FavoriteProductController =
	new FavoriteProductController(favoriteProductBusiness);

export const favoriteProductRouter: Router = express.Router();

//Routes

favoriteProductRouter.post(
	'/user/add/favorites/:productId',
	favoriteProductController.addProduct
);

favoriteProductRouter.get(
	'/user/favorites',
	favoriteProductController.getProducts
);

favoriteProductRouter.delete(
	'/user/favorites/delete/:productId',
	favoriteProductController.deleteProduct
);
