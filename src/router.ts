import express from 'express';
import { userRoute } from './routes/userRoute';
import { addressRouter } from './routes/addressRoute';

const router = express.Router().use('/user', userRoute).use('/address', addressRouter);

export { router };
