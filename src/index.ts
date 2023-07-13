import cors from 'cors';
import express from 'express';
import { productController } from './Models/Classes';
// import { userRouter } from './Router/User/UserRouter';
// import { cardRouter } from './Router/Card/CardRouter';
// import { app } from './Router/Product/ProductRouter';
// import { favoriteProductRouter } from './Router/Favorites/FavoriteProductRouter';
// import cartRouter from './router/cart/cartrouter';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
	if (server) {
		console.log(`The server is running on localhost:${port}`);
	} else console.log('Error running the server');
});

//Routes

// app.use(userRouter);
// app.use(cartRouter);
// app.use(cardRouter);
// app.use(productRouter);
// app.use(favoriteProductRouter);

app.post('/insertProduct', productController.insertProduct);
app.post('/:productId/add-description', productController.addDescription);

app.get('/products', productController.getProducts);
app.get('/:productId/description', productController.getDescriptions);
app.get('/products/:id', productController.getProductById);

app.put('/product/:productId/edit', productController.editPrice);
app.put('/product/edit-quantity/:productId', productController.editQuantity);
app.put('/:descriptionId/edit-description', productController.editDescription);

app.delete('/product/:productId', productController.deleteProduct);
app.delete('/:descriptionId/delete', productController.deleteDescription);
