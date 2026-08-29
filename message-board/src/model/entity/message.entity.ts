import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 32,
  })
  username: string;

  @Column({
    length: 140,
  })
  text: string;
}
