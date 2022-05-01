import { dataSource } from '../data-source';
import { UserEntity } from '../entities/user';

export const userRepository = dataSource.getRepository(UserEntity);
