import { app } from './app';
import { connectDatabase } from './utils/connectDatabase';

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  connectDatabase();
  console.log(`Server running on http://localhost:${SERVER_PORT}`);
});
