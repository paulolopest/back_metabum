import cors from 'cors';
import express, { Express } from 'express';
import { userRouter } from './Router/User/UserRouter';
import { cartRouter } from './Router/Cart/CartRouter';
import { cardRouter } from './Router/Card/CardRouter';
import { productRouter } from './Router/Product/ProductRouter';
import { favoriteProductRouter } from './Router/Favorites/FavoriteProductRouter';

const port = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
	if (server) {
		console.log(`The server is running on localhost:${port}`);
	} else console.log('Error running the server');
});

app.use(userRouter);
app.use(cartRouter);
app.use(cardRouter);
app.use(productRouter);
app.use(favoriteProductRouter);
