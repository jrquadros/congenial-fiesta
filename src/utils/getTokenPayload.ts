import JWT from 'jsonwebtoken';
import { environment } from '../config/environment';

export type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export const getTokenPayload = (token: string) => {
  const decoded = JWT.verify(token, environment.SECRET_KEY as string);

  return decoded as TokenPayload;
};
