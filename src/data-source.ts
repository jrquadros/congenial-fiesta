import { DataSource } from 'typeorm';

import { environment } from './config/environment';
import { UserEntity } from './entities/user';

const { DB_USER, POSTGRES_DB, POSTGRES_PASSWORD, NODE_ENV } = environment;

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: DB_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [UserEntity],
  subscribers: [],
  migrations: [],
});

const testDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5431,
  username: 'postgres',
  password: 'postgres',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [UserEntity],
  subscribers: [],
  migrations: [],
});

export const dataSource = NODE_ENV === 'test' ? testDataSource : appDataSource;
