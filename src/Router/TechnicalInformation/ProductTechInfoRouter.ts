import express, { Router } from 'express';
import { productTechInfoController } from '../../Models/Classes';

export const productTechInfoRouter: Router = express.Router();

//

productTechInfoRouter.post(
	'/product/technical-information/add/:productId',
	productTechInfoController.addTI
);

productTechInfoRouter.get(
	'/product/technical-information/:productId',
	productTechInfoController.getProductTI
);

productTechInfoRouter.delete(
	'/product/technical-information/delete/all/:productId',
	productTechInfoController.deleteAllProductTI
);

productTechInfoRouter.delete(
	'/product/technical-information/delete/:productId',
	productTechInfoController.deleteProductTI
);
