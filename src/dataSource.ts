import { DataSource } from 'typeorm';

import { environment } from './config/environment';
import { UserEntity } from './entities/user';
import { AddressEntity } from './entities/address';

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
  entities: [UserEntity, AddressEntity],
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
  logging: false,
  entities: [UserEntity, AddressEntity],
  subscribers: [],
  migrations: [],
  dropSchema: true,
  synchronize: true,
});

export const dataSource = NODE_ENV === 'test' ? testDataSource : appDataSource;
