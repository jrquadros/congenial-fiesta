import { DataSource } from 'typeorm';

import { environment } from './config/environment';

const { DB_USER, POSTGRES_DB, POSTGRES_PASSWORD } = environment;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: DB_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});

export const TestDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5431,
  username: 'postgres',
  password: 'postgres',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [],
  subscribers: [],
  migrations: [],
});
