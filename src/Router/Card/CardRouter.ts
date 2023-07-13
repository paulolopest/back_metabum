// import express, { Router } from 'express';
// import { CardData } from '../../Data/Card/CardData';
// import { HashManager } from '../../Services/HashManager';
// import { IdGenerator } from '../../Services/IdGenerator';
// import { Authenticator } from '../../Services/Authenticator';
// import { CardBusiness } from '../../Business/Card/CardBusiness';
// import { CardController } from '../../Controller/Card/CardController';

// const cardBusiness: CardBusiness = new CardBusiness(
// 	new Authenticator(),
// 	new HashManager(),
// 	new IdGenerator(),
// 	new CardData()
// );
// const cardController: CardController = new CardController(cardBusiness);

// export const cardRouter: Router = express.Router();

// //Routes

// cardRouter.post('/user/registerCard', cardController.createCard);

// cardRouter.get('/user/cards', cardController.getAllCards);

// cardRouter.delete('/user/card/:cardId', cardController.deleteCard);
