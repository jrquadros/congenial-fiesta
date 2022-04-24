import { app } from './app';
import dontenv from 'dotenv';
import { connectDatabase } from './utils/connectDatabase';

dontenv.config();

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  connectDatabase();
  console.log(`Server running on http://localhost:${SERVER_PORT}`);
});
