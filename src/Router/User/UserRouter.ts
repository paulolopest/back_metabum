import express, { Router } from 'express';
import { UserData } from '../../Data/User/UserData';
import { IdGenerator } from '../../Services/IdGenerator';
import { HashManager } from '../../Services/HashManager';
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

userRouter.put('/profile/edit-name', userController.editProfileName);
userRouter.put('/profile/change-password', userController.editPassword);
userRouter.put('/profile/update-email', userController.editEmail);
userRouter.put(
	'/profile/update-address/:zipCode',
	userController.addDefaultAddress
);

userRouter.delete('/user/delete/profile', userController.deleteUser);
