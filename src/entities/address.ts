import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @ManyToOne(() => UserEntity)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  // eslint-disable-next-line @typescript-eslint/indent
  owner: UserEntity;
}
