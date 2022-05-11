import { RequestHandler } from 'express';
import { Address } from '../../entities/types';
import { addressRepository } from '../../repositories/addressRepository';
import { getToken } from '../../utils/getToken';
import { getTokenPayload } from '../../utils/getTokenPayload';
import {
  validateEditAddressParams,
  validateEditAddressBody,
} from './validations/editAddress.validation';

export type EditAddressReqParams = { id?: string };

export type EditAddressReqBody = Omit<Address, 'id' | 'user'>;

// FIXME
/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824

export const editAddress: RequestHandler<
  EditAddressReqParams,
  unknown,
  EditAddressReqBody
> = async (req, res) => {
  try {
    const token = getToken(req);

    const { id: userId } = getTokenPayload(token as string);

    const { error: paramsError } = await validateEditAddressParams(req.params);

    if (paramsError) {
      return res.status(400).json(paramsError).send();
    }

    const { error: bodyError } = await validateEditAddressBody(req.body);

    if (bodyError) {
      return res.status(400).json(bodyError).send();
    }

    const { id } = req.params;
    const { city, country, houseNumber, postalCode, street } = req.body;

    const result = await addressRepository.update(
      { id: id as string, user: { id: userId } },
      { city, country, houseNumber, postalCode, street }
    );

    if (result.affected === 0) {
      return res.status(404).send();
    }

    return res.json({ message: 'Address updated' }).status(204).send();
  } catch (error) {
    return res.status(500).send();
  }
};
