import request from 'supertest';
import { app } from '../../../app';
import { RegisterReqBody } from '../register';
import { dataSource } from '../../../dataSource';

const user: RegisterReqBody = {
  email: 'email@email.com',
  password: 'password123',
  firstName: 'Foo',
  lastName: 'Bar',
};

beforeAll(async () => {
  await dataSource.initialize();
});

afterAll(async () => {
  await dataSource.destroy();
});

const { email, password } = user;

describe('POST /api/user/register', () => {
  it('responds with json', (done) => {
    request(app)
      .post('/api/user/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(() => {
        done();
      });
  });

  it('responds with 400 if body is invalid', (done) => {
    request(app)
      .post('/api/user/register')
      .set('Accept', 'application/json')
      .send({ email, password })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(() => {
        done();
      });
  });

  it('responds with 409 if user already exists', (done) => {
    request(app)
      .post('/api/user/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(409)
      .then(() => done());
  });
});
