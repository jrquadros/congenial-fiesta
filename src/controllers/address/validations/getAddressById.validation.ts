import * as yup from 'yup';
import { GetAddressByIdParams } from '../getAddressById';

export const addressParamsSchema = yup.object().shape({
  id: yup.string().uuid().required(),
});

export const validateAddressByIdParams = async (
  params: GetAddressByIdParams
): Promise<{ error?: yup.ValidationError }> => {
  try {
    await addressParamsSchema.validate(params);
    return { error: undefined };
  } catch (error) {
    return { error: error as yup.ValidationError };
  }
};
