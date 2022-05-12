import { hashPassword } from '../hashPassword';

test('hash password', () => {
  const plainTextPassword = '123456';
  const secretKey = 'secret';

  const fakeSecret = 'fakeSecret';

  const hashed = hashPassword(plainTextPassword, secretKey);

  const hashedFake = hashPassword(plainTextPassword, fakeSecret);

  expect(hashed).toBeDefined();

  expect(hashed).not.toBe(hashedFake);
});
