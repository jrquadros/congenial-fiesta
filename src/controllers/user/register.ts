import { RequestHandler } from 'express';
import { environment } from '../../config/environment';
import { User } from '../../entities/types';
import { userRepository } from '../../repositories/userRepository';
import { hashPassword } from '../../utils/hashPassword';
import { validateRegister } from './validations/register.validation';

export type RegisterReqBody = Omit<User, 'id' | 'createdAt' | 'isActive'>;

export const register: RequestHandler<unknown, unknown, RegisterReqBody> = async (req, res) => {
  try {
    const { password, email } = req.body;

    const { error } = await validateRegister(req.body);

    if (error) {
      res.status(400).json(error).send();
    }

    const userALreadyExists = await userRepository.findOne({ where: { email } });

    if (userALreadyExists) {
      return res.status(409).json({ error: 'User already exists' }).send();
    }

    const hash = hashPassword(password, environment.SECRET_KEY as string);

    const { id } = await userRepository.save({ ...req.body, password: hash });

    res.status(201).json({ id });
  } catch (error) {
    res.status(500).send();
  }
};
