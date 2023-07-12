import express, { Router } from 'express';
import { UserData } from '../../Data/User/UserData';
import { HashManager } from '../../Services/HashManager';
import { IdGenerator } from '../../Services/IdGenerator';
import { Authenticator } from '../../Services/Authenticator';
import { UserBusiness } from '../../Business/User/UserBusiness';
import { UserController } from '../../Controller/User/UserController';

const userBusiness: UserBusiness = new UserBusiness(
	new Authenticator(),
	new HashManager(),
	new IdGenerator(),
	new UserData()
);
const userController: UserController = new UserController(userBusiness);

export const userRouter: Router = express.Router();

//Routes

userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.post('/token/validate-token', userController.validateToken);

userRouter.get('/profile', userController.getProfile);

userRouter.put('/profile/edit', userController.editProfileName);

userRouter.delete('/user/profile', userController.deleteUser);
