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

productRouter.post('/add-product', productController.insertProduct);
productRouter.post('/product/add-image/:productId', productController.addImg);
productRouter.post(
	'/product/description/add-description/:productId',
	productController.addDescription
);

//get -- get -- get -- get -- get -- get --

productRouter.get('/products', productController.getProducts);
productRouter.get('/product/id/:id', productController.getProductById);
productRouter.get('/product/brand/:brand', productController.getProductByBrand);
productRouter.get(
	'/product/images/:productId',
	productController.getProductImgs
);
productRouter.get(
	'/product/description/:productId',
	productController.getDescriptions
);

//put -- put -- put -- put -- put -- put -- put --

productRouter.put(
	'/product/edit-price/:productId',
	productController.editPrice
);
productRouter.put(
	'/product/edit-quantity/:productId',
	productController.editQuantity
);
productRouter.put(
	'/product/edit-description/:descriptionId',
	productController.editDescription
);

//delete -- delete -- delete -- delete -- delete -- delete -- delete --

productRouter.delete(
	'/product/delete/:productId',
	productController.deleteProduct
);
productRouter.delete(
	'/product/description/delete/:descriptionId',
	productController.deleteDescription
);
productRouter.delete(
	'/product/img/delete/:id',
	productController.deleteProductImg
);
