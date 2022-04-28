import { dataSource } from '../data-source';

export const connectDatabase = async () => {
  try {
    return await dataSource.initialize();
  } catch (error) {
    console.log(error);
  }
};
