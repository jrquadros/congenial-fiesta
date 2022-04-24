import { environment } from '../config/environment';
import { AppDataSource, TestDataSource } from '../data-source';

export const connectDatabase = async () => {
  const { NODE_ENV } = environment;
  try {
    if (NODE_ENV === 'test') {
      TestDataSource.initialize();
      console.log('Test database connected');
      return;
    }

    await AppDataSource.initialize();
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
};
