import express, { Router } from 'express';
import { UserData } from '../../Data/User/UserData';
import { IdGenerator } from '../../Services/IdGenerator';
import { ProductData } from '../../Data/Product/ProductData';
import { Authenticator } from '../../Services/Authenticator';
import { ProductBusiness } from '../../Business/Product/ProductBusiness';
import { ProductController } from '../../Controller/Product/ProductController';

const productBusiness: ProductBusiness = new ProductBusiness(
	new Authenticator(),
	new IdGenerator(),
	new ProductData(),
	new UserData()
);
const productController: ProductController = new ProductController(
	productBusiness
);

export const productRouter: Router = express.Router();

//post -- post -- post -- post -- post --

productRouter.post('/insertProduct', productController.insertProduct);
productRouter.post('/product/:productId/add-image', productController.addImg);
productRouter.post(
	'/:productId/add-description',
	productController.addDescription
);

//get -- get -- get -- get -- get -- get --

productRouter.get('/products', productController.getProducts);
productRouter.get('/:productId/description', productController.getDescriptions);
productRouter.get('/products/:id', productController.getProductById);
productRouter.get('/products/:brand', productController.getProductByBrand);
productRouter.get(
	'/products/:productId/images',
	productController.getProductImgs
);

//put -- put -- put -- put -- put -- put -- put --

productRouter.put('/product/:productId/edit', productController.editPrice);
productRouter.put(
	'/product/edit-quantity/:productId',
	productController.editQuantity
);
productRouter.put(
	'/:descriptionId/edit-description',
	productController.editDescription
);

//delete -- delete -- delete -- delete -- delete -- delete -- delete --

productRouter.delete('/product/:productId', productController.deleteProduct);
productRouter.delete(
	'/:descriptionId/delete',
	productController.deleteDescription
);
productRouter.delete('/product/:id/delete', productController.deleteProductImg);
