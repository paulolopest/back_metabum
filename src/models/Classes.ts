import { CardData } from '../Data/Card/CardData';
import { CartData } from '../Data/Cart/CartData';
import { UserData } from '../Data/User/UserData';
import { HashManager } from '../Services/HashManager';
import { IdGenerator } from '../Services/IdGenerator';
import { ProductData } from '../Data/Product/ProductData';
import { Authenticator } from '../Services/Authenticator';
import { CardBusiness } from '../Business/Card/CardBusiness';
import { CartBusiness } from '../Business/Cart/CartBusiness';
import { UserBusiness } from '../Business/User/UserBusiness';
import { UserController } from '../Controller/User/UserController';
import { CardController } from '../Controller/Card/CardController';
import { CartController } from '../Controller/Cart/CartController';
import { ProductBusiness } from '../Business/Product/ProductBusiness';
import { ProductController } from '../Controller/Product/ProductController';
import { FavoriteProductData } from '../Data/FavoriteProduct/FavoriteProductData';
import { FavoriteProductBusiness } from '../Business/FavoriteProduct/FavoriteProductBusiness';
import { FavoriteProductController } from '../Controller/FavoriteProduct/FavoriteProductController';

// User ---- User ---- User ---- User

export const userBusiness = new UserBusiness(
	new Authenticator(),
	new HashManager(),
	new IdGenerator(),
	new UserData()
);
export const userController = new UserController(userBusiness);
export const userData = new UserData();

// Card ---- Card ---- Card ---- Card

export const cardBusiness = new CardBusiness(
	new Authenticator(),
	new HashManager(),
	new IdGenerator(),
	new CardData()
);
export const cardController = new CardController(cardBusiness);
export const cardData = new CardData();

// Product ---- Product ---- Product ---- Product

export const productBusiness = new ProductBusiness(
	new Authenticator(),
	new IdGenerator(),
	new ProductData(),
	new UserData()
);
export const productController = new ProductController(productBusiness);
export const productData = new ProductData();

// Cart ------- Cart -------- Cart ------- Cart

export const cartBusiness = new CartBusiness(
	new Authenticator(),
	new IdGenerator(),
	new ProductData(),
	new CartData()
);
export const cartController = new CartController(cartBusiness);
export const cartData = new CartData();

// FavoriteProduct -------- FavoriteProduct ---------- FavoriteProduct

export const favoriteProductBusiness: FavoriteProductBusiness =
	new FavoriteProductBusiness(
		new FavoriteProductData(),
		new Authenticator(),
		new IdGenerator(),
		new ProductData()
	);
export const favoriteProductController: FavoriteProductController =
	new FavoriteProductController(favoriteProductBusiness);

export const favoriteProductData = new FavoriteProductData();
