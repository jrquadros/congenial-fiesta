import * as yup from 'yup';
import { CountryEnum } from '../../../entities/types';
import { GetAddressReqParams } from '../getAddresses';

export const getAddressParamsSchema = yup.object().shape({
  country: yup.mixed().oneOf(Object.values(CountryEnum)),
  postalCode: yup.string(),
});

export const validateGetAddressParams = async (
  params: GetAddressReqParams
): Promise<{ error?: yup.ValidationError }> => {
  try {
    await getAddressParamsSchema.validate(params);
    return { error: undefined };
  } catch (error) {
    return { error: error as yup.ValidationError };
  }
};
