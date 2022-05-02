import * as yup from 'yup';
import { CountryEnum } from '../../../entities/types';
import { CreateAddressReqBody } from '../createAddress';

export const createAddressSchema = yup.object().shape({
  city: yup.string().required(),
  country: yup.mixed().oneOf(Object.values(CountryEnum), 'Country is required').required(),
  houseNumber: yup.string().required(),
  postalCode: yup.string().required(),
  street: yup.string().required(),
});

export const validateCreateAddress = async (
  reqBody: CreateAddressReqBody
): Promise<{ error?: yup.ValidationError }> => {
  try {
    await createAddressSchema.validate(reqBody);
    return { error: undefined };
  } catch (error) {
    return { error: error as yup.ValidationError };
  }
};
