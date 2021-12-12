import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 32,
  })
  username: string;

  @Column({
    length: 32,
  })
  password: string;
}
