import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ unique: true }) email: string;
  @Column({ select: false }) password: string;
  @Column({ default: true }) isActive: boolean;
  @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  // https://github.com/typescript-eslint/typescript-eslint/issues/1824
  // eslint-disable-next-line @typescript-eslint/indent
  createdAt: Date;
}
