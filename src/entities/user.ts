import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column() email: string;
  @Column() password: string;
  @Column({ default: true }) isActive: boolean;
  @CreateDateColumn({ type: 'timestamp', nullable: false, default: new Date() }) createdAt: Date;
}

export type User = UserEntity;
