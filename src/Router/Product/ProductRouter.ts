import express, { Router } from 'express';
import { productController } from '../../Models/Classes';

export const productRouter: Router = express.Router();

//Routes

productRouter.post('/insertProduct', productController.insertProduct);
productRouter.post(
	'/:productId/add-description',
	productController.addDescription
);

productRouter.get('/products', productController.getProducts);
productRouter.get('/:productId/description', productController.getDescriptions);
productRouter.get('/products/:id', productController.getProductById);

productRouter.put('/product/:productId/edit', productController.editPrice);
productRouter.put(
	'/product/edit-quantity/:productId',
	productController.editQuantity
);
productRouter.put(
	'/:descriptionId/edit-description',
	productController.editDescription
);

productRouter.delete('/product/:productId', productController.deleteProduct);
productRouter.delete(
	'/:descriptionId/delete',
	productController.deleteDescription
);
