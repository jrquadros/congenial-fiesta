import express from 'express';
import { userController } from '../controllers/user/userController';
import { verifyToken } from '../middlewares/verifyToken';
import { addressRouter } from './addressRoute';

const userRoute = express
  .Router()
  .post('/register', userController.register)
  .post('/auth', userController.auth)
  .delete('/', verifyToken, userController.deleteAccount)
  .get('/', verifyToken, userController.userInfo)
  .put('/', verifyToken, userController.editUser)
  .use('/address', addressRouter);

export { userRoute };
