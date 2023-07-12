import express, { Router } from 'express';
import { UserController } from '../../Controller/User/UserController';
import { userBusiness } from '../../Models/Classes';

const userController: UserController = new UserController(userBusiness);

export const userRouter: Router = express.Router();

//Routes

userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.post('/token/validate-token', userController.validateToken);

userRouter.get('/profile', userController.getProfile);

userRouter.put('/profile/edit', userController.editProfileName);

userRouter.delete('/user/profile', userController.deleteUser);
