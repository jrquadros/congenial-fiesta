import { app } from './app';
import dontenv from 'dotenv';

dontenv.config();

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${SERVER_PORT}`);
});
