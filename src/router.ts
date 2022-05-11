import express from 'express';
import { userRoute } from './routes/userRoute';

const router = express.Router().use('/user', userRoute);

export { router };
