import { RequestHandler, Request } from 'express';
import { userRepository } from '../../repositories/userRepository';
import { getToken } from '../../utils/getToken';
import { getTokenPayload } from '../../utils/getTokenPayload';

export const deleteAccount: RequestHandler = async (req, res) => {
  const token = getToken(req as Request);

  const payload = getTokenPayload(token as string);

  const { id } = payload;

  try {
    const deletedUser = await userRepository.delete({ id });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' }).send();
    }

    return res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' }).send();
  }
};
