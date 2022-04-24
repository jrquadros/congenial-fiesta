import express from 'express';
import 'reflect-metadata';

const app = express();

app.use(express.json());

app.get('/', (_, res) => res.json({ message: 'Hello World' }));

export { app };
