import express from 'express';
import { userController } from '../controllers/user/userController';
import { verifyToken } from '../middlewares/verifyToken';

const userRoute = express
  .Router()
  .post('/register', userController.register)
  .post('/auth', userController.auth)
  .delete('/', verifyToken, userController.deleteAccount)
  .get('/', verifyToken, userController.userInfo);

export { userRoute };
