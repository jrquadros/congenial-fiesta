import { RequestHandler, Request } from 'express';
import { addressRepository } from '../../repositories/addressRepository';
import { getToken } from '../../utils/getToken';
import { getTokenPayload } from '../../utils/getTokenPayload';
import { validateAddressByIdParams } from './validations/getAddressById.validation';

export type GetAddressByIdParams = { id?: string };

export const getAddressById: RequestHandler<GetAddressByIdParams> = async (req, res) => {
  try {
    const token = getToken(req as Request);

    // auth middleware will check if token is valid
    const payload = getTokenPayload(token as string);

    const { id: userId } = payload;

    const { params } = req;

    const { error } = await validateAddressByIdParams(params);

    if (error) {
      return res.send(error).status(400);
    }

    const { id } = params;

    const address = await addressRepository.findOne({ where: { id, user: { id: userId } } });

    if (!address) {
      return res.status(404).send();
    }

    return res.json(address).status(200).send();
  } catch (error) {
    return res.status(500).send();
  }
};
