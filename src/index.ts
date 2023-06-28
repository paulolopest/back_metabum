import {
	cardController,
	productController,
	paymentController,
	userController,
	cartController,
} from './models/Classes';
import { app } from './services/App';

app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.get('/profile', userController.getProfile);
app.put('/profile/edit', userController.editProfileName);
app.delete('/user/profile', userController.deleteUser);
app.post('/token/validate-token', userController.validateToken);

app.post('/user/registerCard', cardController.createCard);
app.get('/user/cards', cardController.getAllCards);
app.delete('/user/card/:cardId', cardController.deleteCard);

app.post('/insertProduct', productController.insertProduct);
app.get('/products', productController.getProducts);
app.get('/products/:id', productController.getProductById);
app.put('/product/:productId/edit', productController.editPrice);
app.delete('/product/:productId', productController.deleteProduct);
app.put('/product/edit-quantity/:productId', productController.editQuantity);

app.post('/products/:productId/creditCard', paymentController.creditPayment);
app.post('/products/:productId/boleto', paymentController.boletoPayment);
app.get('/profile/purchases/credit_card', paymentController.getCardPayment);
app.get('/profile/purchases/boleto', paymentController.getBoletoPayment);

app.post('/cart/add/:productId', cartController.addProduct);
app.get('/cart/user', cartController.getUserCart);
app.put('/cart/edit-quantity/:productId', cartController.editProductQuantity);
app.delete('/cart/delete/:productId', cartController.removeProduct);
app.delete('/cart/delete', cartController.deleteCart);
