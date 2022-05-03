import { RequestHandler } from 'express';
import { Address } from '../../entities/types';
import { addressRepository } from '../../repositories/addressRepository';
import { userRepository } from '../../repositories/userRepository';
import { getTokenPayload } from '../../utils/getTokenPayload';
import { validateCreateAddress } from './validations/createAddress.validation';

export type CreateAddressReqBody = Omit<Address, 'id' | 'owner'>;

export const createAddress: RequestHandler<unknown, unknown, CreateAddressReqBody> = async (
  req,
  res
) => {
  try {
    const { error } = await validateCreateAddress(req.body);

    if (error) {
      return res.status(400).json(error).send();
    }

    const token = req.headers.token;

    const payload = getTokenPayload(token as string);

    const { id } = payload;

    const owner = await userRepository.findOneBy({ id });

    if (!owner) return res.status(401).send();

    const { city, country, houseNumber, postalCode, street } = req.body;

    const address = await addressRepository.save({
      city,
      country,
      houseNumber,
      postalCode,
      street,
      owner,
    });

    return res
      .json({ message: 'Adress created sucessfuly', address: address.id })
      .status(201)
      .send();
  } catch (error) {
    return res.json({ error: 'Internal server error' }).status(500).send();
  }
};
