import { RequestHandler, Request } from 'express';
import { User } from '../../entities/types';
import { userRepository } from '../../repositories/userRepository';
import { getToken } from '../../utils/getToken';
import { getTokenPayload } from '../../utils/getTokenPayload';
import { hashPassword } from '../../utils/hashPassword';
import { validateUserEditBody } from './validations/editUser.validation';

export type EditUserReqBody = Partial<Omit<User, 'id' | 'createdAt' | 'isActive' | 'addresses'>>;

export const editUser: RequestHandler<unknown, unknown, EditUserReqBody> = async (req, res) => {
  try {
    const token = getToken(req as Request);
    const { id: userId } = getTokenPayload(token as string);

    const { error: validationError } = await validateUserEditBody(req.body);

    if (validationError) {
      return res.status(400).json(validationError).send();
    }

    const { email, firstName, lastName, password: plainTextPassword } = req.body;

    const password = plainTextPassword && hashPassword(plainTextPassword);

    const result = await userRepository.update(
      { id: userId },
      { email, firstName, lastName, password }
    );

    if (result.affected === 0) {
      return res.status(404).send();
    }

    return res.json({ message: 'User updated' }).status(204).send();
  } catch (error) {
    return res.status(500).send();
  }
};
