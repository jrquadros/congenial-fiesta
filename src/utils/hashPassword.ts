import crypto from 'crypto-js';
import { environment } from '../config/environment';

export const hashPassword = (password: string): string => {
  const hashedPassword = crypto.HmacSHA256(password, environment.SECRET_KEY as string).toString();

  return hashedPassword;
};
