// import express, { Router } from 'express';
// import { UserData } from '../../Data/User/UserData';
// import { IdGenerator } from '../../Services/IdGenerator';
// import { ProductData } from '../../Data/Product/ProductData';
// import { Authenticator } from '../../Services/Authenticator';
// import { ProductBusiness } from '../../Business/Product/ProductBusiness';
// import { ProductController } from '../../Controller/Product/ProductController';

// const productBusiness: ProductBusiness = new ProductBusiness(
// 	new Authenticator(),
// 	new IdGenerator(),
// 	new ProductData(),
// 	new UserData()
// );
// const productController: ProductController = new ProductController(
// 	productBusiness
// );

// export const productRouter: Router = express.Router();

// //Routes

// productRouter.post('/insertProduct', productController.insertProduct);
// productRouter.post(
// 	'/:productId/add-description',
// 	productController.addDescription
// );

// productRouter.get('/products', productController.getProducts);
// productRouter.get('/:productId/description', productController.getDescriptions);
// productRouter.get('/products/:id', productController.getProductById);

// productRouter.put('/product/:productId/edit', productController.editPrice);
// productRouter.put(
// 	'/product/edit-quantity/:productId',
// 	productController.editQuantity
// );
// productRouter.put(
// 	'/:descriptionId/edit-description',
// 	productController.editDescription
// );

// productRouter.delete('/product/:productId', productController.deleteProduct);
// productRouter.delete(
// 	'/:descriptionId/delete',
// 	productController.deleteDescription
// );
