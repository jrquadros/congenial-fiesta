import { RequestHandler } from 'express';
import { User } from '../../entities/user';
import { userRepository } from '../../repositories/userRepository';
import { hashPassword } from '../../utils/hashPassword';
import { validateRegister } from './register.validation';

export type RegisterReqBody = Omit<User, 'id' | 'createdAt' | 'isActive'>;

export const register: RequestHandler<unknown, unknown, RegisterReqBody> = async (req, res) => {
  try {
    const { password, email } = req.body;

    const { error } = await validateRegister(req.body);

    if (error) {
      res.status(400).send(error);
    }

    const userALreadyExists = await userRepository.findOne({ where: { email } });

    if (userALreadyExists) {
      return res.status(409).json({ error: 'User already exists' }).send();
    }

    const hash = hashPassword(password);

    const { id } = await userRepository.save({ ...req.body, password: hash });

    res.status(201).json({ id });
  } catch (error) {
    res.status(500).send();
  }
};
