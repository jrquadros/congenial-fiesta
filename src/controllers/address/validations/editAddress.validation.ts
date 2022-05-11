import * as yup from 'yup';
import { EditAddressReqParams, EditAddressReqBody } from '../editAddress';

import { CountryEnum } from '../../../entities/types';

const editAddressReqParamsSchema = yup.object().shape({
  id: yup.string().uuid().required(),
});

const editAddressReqBodySchema = yup.object().shape({
  city: yup.string(),
  country: yup.mixed().oneOf(Object.values(CountryEnum)),
  houseNumber: yup.string(),
  postalCode: yup.string(),
  street: yup.string(),
});

export const validateEditAddressParams = async (
  params: EditAddressReqParams
): Promise<{ error?: yup.ValidationError }> => {
  try {
    await editAddressReqParamsSchema.validate(params);
    return { error: undefined };
  } catch (error) {
    return { error: error as yup.ValidationError };
  }
};

export const validateEditAddressBody = async (
  body: EditAddressReqBody
): Promise<{ error?: yup.ValidationError }> => {
  try {
    await editAddressReqBodySchema.validate(body);
    return { error: undefined };
  } catch (error) {
    return { error: error as yup.ValidationError };
  }
};
