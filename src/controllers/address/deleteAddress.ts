import { RequestHandler, Request } from 'express';
import { addressRepository } from '../../repositories/addressRepository';
import { getToken } from '../../utils/getToken';
import { getTokenPayload } from '../../utils/getTokenPayload';

type DeleteAddressReqParams = { id?: string };

export const deleteAddress: RequestHandler<DeleteAddressReqParams> = async (req, res) => {
  const token = getToken(req as Request);

  const payload = getTokenPayload(token as string);

  const { id: userId } = payload;

  const { id } = req.params;

  try {
    const deletedAddress = await addressRepository.delete({ id: id, user: { id: userId } });

    if (deletedAddress.affected === 0) {
      return res.status(404).json({ error: 'Address not found' }).send();
    }

    return res.status(204).json({ message: 'Address deleted successfully' }).json();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' }).send();
  }
};
