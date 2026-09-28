import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column({
        default: 'STUDENT',
    })
    role: string;

    @CreateDateColumn()
    createdAt: Date;
}