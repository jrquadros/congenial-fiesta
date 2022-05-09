import { RequestHandler, Request } from 'express';
import { CountryEnum } from '../../entities/types';
import { addressRepository } from '../../repositories/addressRepository';
import { userRepository } from '../../repositories/userRepository';
import { getToken } from '../../utils/getToken';
import { getTokenPayload } from '../../utils/getTokenPayload';
import { validateGetAddressParams } from './validations/getAddresses.validation';

export type GetAddressReqParams = Partial<{ country: CountryEnum; postalCode: string }>;

export const getAddresses: RequestHandler<unknown, unknown, unknown, GetAddressReqParams> = async (
  req,
  res
) => {
  try {
    const token = getToken(req as Request);

    // auth middleware will check if token is valid
    const payload = getTokenPayload(token as string);

    const { id: userId } = payload;

    const { country, postalCode } = req.query;

    const { error } = await validateGetAddressParams({ country, postalCode });

    if (error) {
      return res.send(error).status(400);
    }

    const user = await userRepository.findOne({
      where: { id: userId },
      select: ['id'],
    });

    if (!user) return res.status(401).send();

    const addresses = await addressRepository.find({ where: { user, postalCode, country } });

    if (addresses.length === 0) {
      return res.status(404).send();
    }

    return res
      .json(addresses || [])
      .status(200)
      .send();
  } catch (error) {
    return res.status(500).send();
  }
};
