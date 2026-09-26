import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Long } from 'typeorm/driver/mongodb/bson.typings.js';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: Long;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  fullName: string;
}