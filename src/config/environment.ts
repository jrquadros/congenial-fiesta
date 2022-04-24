import { config } from 'dotenv';

config();

const { DB_USER, NODE_ENV, POSTGRES_DB, POSTGRES_PASSWORD, SERVER_PORT } = process.env;

export const environment = { DB_USER, NODE_ENV, POSTGRES_DB, POSTGRES_PASSWORD, SERVER_PORT };
