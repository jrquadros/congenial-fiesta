import { dataSource } from '../dataSource';
import { AddressEntity } from '../entities/address';

export const addressRepository = dataSource.getRepository(AddressEntity);
