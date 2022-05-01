import * as yup from 'yup';
import { RegisterReqBody } from './register';

export const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

export const validateRegister = async (
  reqBody: RegisterReqBody
): Promise<{ error?: yup.ValidationError }> => {
  try {
    await userSchema.validate(reqBody);
    return { error: undefined };
  } catch (error) {
    return { error: error as yup.ValidationError };
  }
};
