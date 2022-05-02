import express from 'express';
import { userController } from '../controllers/user/userController';

const userRoute = express
  .Router()
  .get('/hello', (_, res) => res.send('user route'))
  .post('/register', userController.register)
  .post('/auth', userController.auth);

export { userRoute };
