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
import { UserAddressData } from '../Data/User/UserAddressData';
import { UserController } from '../Controller/User/UserController';
import { CardController } from '../Controller/Card/CardController';
import { CartController } from '../Controller/Cart/CartController';
import { ProductBusiness } from '../Business/Product/ProductBusiness';
import { FavoriteProductData } from '../Data/Product/FavoriteProductData';
import { ProductTechInfoData } from '../Data/Product/ProductTechInfoData';
import { ProductEvaluationData } from '../Data/Product/ProductEvaluationData';
import { UserAddressBusiness } from '../Business/User/UserAddressBusiness';
import { ProductController } from '../Controller/Product/ProductController';
import { UserAddressController } from '../Controller/User/UserAddressController';
import { FavoriteProductBusiness } from '../Business/Product/FavoriteProductBusiness';
import { ProductTechInfoBusiness } from '../Business/Product/ProductTechInfoBusiness';
import { ProductEvaluationBusiness } from '../Business/Product/ProductEvaluationBusiness';
import { ProductEvaluationController } from '../Controller/Product/ProductEvaluationController';
import { FavoriteProductController } from '../Controller/Product/FavoriteProductController';
import { ProductTechInfoController } from '../Controller/Product/ProductTechInfoController';

// User ---- User ---- User ---- User

export const userBusiness: UserBusiness = new UserBusiness(
	new Authenticator(),
	new HashManager(),
	new IdGenerator(),
	new UserData()
);
export const userController: UserController = new UserController(userBusiness);
export const userData: UserData = new UserData();

// Card ---- Card ---- Card ---- Card

export const cardBusiness: CardBusiness = new CardBusiness(
	new Authenticator(),
	new HashManager(),
	new IdGenerator(),
	new CardData()
);
export const cardController: CardController = new CardController(cardBusiness);
export const cardData: CardData = new CardData();

// Product ---- Product ---- Product ---- Product

export const productBusiness: ProductBusiness = new ProductBusiness(
	new Authenticator(),
	new IdGenerator(),
	new ProductData(),
	new UserData()
);
export const productController: ProductController = new ProductController(
	productBusiness
);
export const productData: ProductData = new ProductData();

// Cart ------- Cart -------- Cart ------- Cart

export const cartBusiness: CartBusiness = new CartBusiness(
	new Authenticator(),
	new IdGenerator(),
	new ProductData(),
	new CartData()
);
export const cartController: CartController = new CartController(cartBusiness);
export const cartData: CartData = new CartData();

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

// TI ------- TI -------- TI ------- TI

export const productTechInfoBusiness: ProductTechInfoBusiness =
	new ProductTechInfoBusiness(
		new ProductTechInfoData(),
		new Authenticator(),
		new UserData(),
		new ProductData(),
		new IdGenerator()
	);
export const productTechInfoController: ProductTechInfoController =
	new ProductTechInfoController(productTechInfoBusiness);

export const productTechInfoData: ProductTechInfoData =
	new ProductTechInfoData();

// Address ---------- Address --------- Address

export const userAddressBusiness: UserAddressBusiness = new UserAddressBusiness(
	new UserAddressData(),
	new Authenticator(),
	new IdGenerator()
);

export const userAddressController: UserAddressController =
	new UserAddressController(userAddressBusiness);

export const userAddressData: UserAddressData = new UserAddressData();

// ProductEvaluation ---------- ProductEvaluation --------- ProductEvaluation

export const productEvaluationBusiness: ProductEvaluationBusiness =
	new ProductEvaluationBusiness(
		new ProductEvaluationData(),
		new Authenticator(),
		new IdGenerator()
	);

export const productEvaluationController: ProductEvaluationController =
	new ProductEvaluationController(productEvaluationBusiness);

export const productEvaluationData: ProductEvaluationData =
	new ProductEvaluationData();
