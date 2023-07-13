import cors from 'cors';
import express, { Express } from 'express';
import { userRouter } from './Router/User/UserRouter';
import { cartRouter } from './Router/Cart/CartRouter';
import { cardRouter } from './Router/Card/CardRouter';
import { productRouter } from './Router/Product/ProductRouter';
import { favoriteProductRouter } from './Router/Favorites/FavoriteProductRouter';
import {
	cardController,
	cartController,
	productController,
	userController,
} from './Models/Classes';

const port = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
	if (server) {
		console.log(`The server is running on localhost:${port}`);
	} else console.log('Error running the server');
});

// app.use(userRouter);
// app.use(cartRouter);
// app.use(cardRouter);
// app.use(productRouter);
// app.use(favoriteProductRouter);

app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.post('/token/validate-token', userController.validateToken);
app.get('/profile', userController.getProfile);
app.put('/profile/edit', userController.editProfileName);
app.delete('/user/profile', userController.deleteUser);

//

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

//

cartRouter.post('/cart/add/:productId', cartController.addProduct);

cartRouter.get('/cart/user', cartController.getUserCart);

cartRouter.put(
	'/cart/edit-quantity/:productId',
	cartController.editProductQuantity
);

cartRouter.delete('/cart/delete/:productId', cartController.removeProduct);
cartRouter.delete('/cart/delete', cartController.deleteCart);

//

cartRouter.post('/user/registerCard', cardController.createCard);

cartRouter.get('/user/cards', cardController.getAllCards);

cartRouter.delete('/user/card/:cardId', cardController.deleteCard);
