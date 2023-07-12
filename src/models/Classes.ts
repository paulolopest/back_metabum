import { CardBusiness } from '../Business/Card/CardBusiness';
import { ProductBusiness } from '../Business/Product/ProductBusiness';
import { UserBusiness } from '../Business/User/UserBusiness';
import { CardController } from '../Controller/Card/CardController';
import { ProductController } from '../Controller/Product/ProductController';
import { UserController } from '../Controller/User/UserController';
import { CardData } from '../Data/Card/CardData';
import { ProductData } from '../Data/Product/ProductData';
import { UserData } from '../Data/User/UserData';
import { Authenticator } from '../Services/Authenticator';
import { HashManager } from '../Services/HashManager';
import { IdGenerator } from '../Services/IdGenerator';
import { CartBusiness } from '../Business/Cart/CartBusiness';
import { CartData } from '../Data/Cart/CartData';
import { CartController } from '../Controller/Cart/CartController';

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
