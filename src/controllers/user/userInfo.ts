import { RequestHandler } from 'express';
import { userRepository } from '../../repositories/userRepository';
import { getTokenPayload } from '../../utils/getTokenPayload';

export const userInfo: RequestHandler = async (req, res) => {
  const token = req.headers.token;

  const payload = getTokenPayload(token as string);

  const { id } = payload;

  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' }).send();
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' }).send();
  }
};
