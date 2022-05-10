import { RequestHandler, Request } from 'express';
import { AddressEntity } from '../../entities/address';
import { Address } from '../../entities/types';
import { userRepository } from '../../repositories/userRepository';
import { getToken } from '../../utils/getToken';
import { getTokenPayload } from '../../utils/getTokenPayload';
import { validateCreateAddress } from './validations/createAddress.validation';

export type CreateAddressReqBody = Omit<Address, 'id' | 'user'>;

export const createAddress: RequestHandler<unknown, unknown, CreateAddressReqBody> = async (
  req,
  res
) => {
  try {
    const { error } = await validateCreateAddress(req.body);

    if (error) {
      return res.status(400).json(error).send();
    }

    const token = getToken(req as Request);

    const payload = getTokenPayload(token as string);

    const { id } = payload;

    const user = await userRepository.findOne({
      where: { id },
      relations: { addresses: true },
      select: ['id', 'addresses'],
    });

    if (!user) return res.status(401).send();

    const { city, country, houseNumber, postalCode, street } = req.body;

    const userAddresss = user?.addresses || [];

    const newAddress = {
      city,
      country,
      houseNumber,
      postalCode,
      street,
    } as AddressEntity;

    user.addresses = [...userAddresss, newAddress];

    await userRepository.save(user);

    return res.json({ message: 'Address created' }).status(201).send();
  } catch (error) {
    return res.json({ error: 'Internal server error' }).status(500).send();
  }
};
