import express, { Router } from 'express';
import { cardController } from '../../Models/Classes';

export const cardRouter: Router = express.Router();

//Routes

cardRouter.post('/user/registerCard', cardController.createCard);

cardRouter.get('/user/cards', cardController.getAllCards);

cardRouter.delete('/user/card/:cardId', cardController.deleteCard);
