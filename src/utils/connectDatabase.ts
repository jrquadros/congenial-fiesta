import { dataSource } from '../dataSource';

export const connectDatabase = async () => {
  try {
    return await dataSource.initialize();
  } catch (error) {
    console.log(error);
  }
};
