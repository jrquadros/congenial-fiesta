import { dataSource } from '../dataSource';
import { UserEntity } from '../entities/user';

export const userRepository = dataSource.getRepository(UserEntity);
