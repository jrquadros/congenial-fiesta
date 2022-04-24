import { environment } from '../config/environment';
import { AppDataSource, TestDataSource } from '../data-source';

export const connectDatabase = async () => {
  const { NODE_ENV } = environment;

  try {
    if (NODE_ENV === 'test') {
      const testDataSource = await TestDataSource.initialize();
      console.log('Test database connected');
      return testDataSource;
    }

    const dataSource = await AppDataSource.initialize();
    console.log('Database connected');
    return dataSource;
  } catch (error) {
    console.log(error);
  }
};
