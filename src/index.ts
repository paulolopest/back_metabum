import cors from 'cors';
import express, { Express } from 'express';
import { userRouter } from './Router/User/UserRouter';
import { cartRouter } from './Router/Cart/CartRouter';
import { cardRouter } from './Router/Card/CardRouter';
import { productRouter } from './Router/Product/ProductRouter';
import { favoriteProductRouter } from './Router/Favorites/FavoriteProductRouter';
import { userController } from './Models/Classes';

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
app.use(cartRouter);
app.use(cardRouter);
app.use(productRouter);
app.use(favoriteProductRouter);

app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.post('/token/validate-token', userController.validateToken);

app.get('/profile', userController.getProfile);

app.put('/profile/edit', userController.editProfileName);

app.delete('/user/profile', userController.deleteUser);

//a
