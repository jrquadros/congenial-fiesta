import { DataSource } from 'typeorm';
import { connectDatabase } from '../connectDatabase';

let dataSource: DataSource | undefined;

beforeAll(async () => {
  dataSource = await connectDatabase();
});

afterAll((done) => {
  dataSource?.destroy().then(() => done());
});

test('connectDatabase', async () => {
  expect(dataSource).toBeDefined();
});
