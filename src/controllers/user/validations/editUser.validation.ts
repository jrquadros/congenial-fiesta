import * as yup from 'yup';
import { EditUserReqBody } from '../editUser';

export const editUserSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(8),
  firstName: yup.string(),
  lastName: yup.string(),
});

export const validateUserEditBody = async (
  reqBody: EditUserReqBody
): Promise<{ error?: yup.ValidationError }> => {
  try {
    await editUserSchema.validate(reqBody);
    return { error: undefined };
  } catch (error) {
    return { error: error as yup.ValidationError };
  }
};
