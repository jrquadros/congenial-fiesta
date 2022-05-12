import crypto from 'crypto-js';

export const hashPassword = (password: string, secret: string): string => {
  const hashedPassword = crypto.HmacSHA256(password, secret).toString();

  return hashedPassword;
};
