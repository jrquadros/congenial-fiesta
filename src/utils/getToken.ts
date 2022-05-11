import { Request } from 'express';

export const getToken = (req: Request) => {
  return (req.headers?.token as string) || undefined;
};
