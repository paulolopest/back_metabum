import express, { Router } from 'express';
import { userAddressController } from '../../Models/Classes';

export const userAddressRouter: Router = express.Router();

//Routes

userAddressRouter.get('/user/address/', userAddressController.getUserAddress);
userAddressRouter.get('/user/default-address', userAddressController.getUserDefaultZipCode);

userAddressRouter.post('/user/address/add-address',userAddressController.addAddress);

userAddressRouter.delete('/user/address/delete/:addressId',userAddressController.deleteUserAddress);
