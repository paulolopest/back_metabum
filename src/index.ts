import cors from 'cors';
import express from 'express';
import cartRouter from './Router/Cart/CartRouter';
import { userRouter } from './Router/User/UserRouter';
import { productRouter } from './Router/Product/ProductRouter';
import { userAddressRouter } from './Router/UserAddress/UserAddressRouter';
import { favoriteProductRouter } from './Router/Favorites/FavoriteProductRouter';
import { productTechInfoRouter } from './Router/TechnicalInformation/ProductTechInfoRouter';
import { productEvaluationRouter } from './Router/ProductEvaluation/ProductEvaluationRouter';

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

app.use(userRouter);
app.use(cartRouter);
app.use(productRouter);
app.use(userAddressRouter);
app.use(favoriteProductRouter);
app.use(productTechInfoRouter);
app.use(productEvaluationRouter);
