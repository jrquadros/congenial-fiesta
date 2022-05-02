import { RequestHandler } from 'express';
import JWT from 'jsonwebtoken';
import { environment } from '../config/environment';

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: 'Missing token' }).send();
  }

  return JWT.verify(token as string, environment.SECRET_KEY as string, (err) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' }).send();
    }

    return next();
  });
};
