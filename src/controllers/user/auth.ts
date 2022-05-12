import { RequestHandler } from 'express';
import { userRepository } from '../../repositories/userRepository';
import { hashPassword } from '../../utils/hashPassword';
import JWT from 'jsonwebtoken';
import { environment } from '../../config/environment';

type AuthReqBody = {
  email: string;
  password: string;
};

export const auth: RequestHandler<unknown, unknown, AuthReqBody> = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' }).send();
  }

  const user = await userRepository.findOne({ where: { email }, select: ['password', 'id'] });

  if (!user) {
    return res.status(404).json({ error: 'User not found' }).send();
  }

  const hashed = hashPassword(password, environment.SECRET_KEY as string);

  if (user.password !== hashed) {
    return res.status(401).json({ error: 'Wrong password' }).send();
  }

  const { id } = user;

  const token = JWT.sign({ id }, environment.SECRET_KEY as string, { expiresIn: '3d' });

  return res.send({ token });
};
