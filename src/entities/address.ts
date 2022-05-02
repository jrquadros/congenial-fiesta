import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CountryEnum } from './types';
import { UserEntity } from './user';

@Entity()
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'enum', enum: CountryEnum }) country: CountryEnum;
  @Column() postalCode: string;
  @Column() city: string;
  @Column() street: string;
  @Column() houseNumber: string;

  @ManyToOne(() => UserEntity, (user) => user.addresses) owner: UserEntity;
}
