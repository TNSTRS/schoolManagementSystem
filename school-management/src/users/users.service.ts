import {
    ConflictException,
    Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findByUsername(username: string) {

        return this.userRepository.findOne({
            where: {
                username,
            },
        });
    }

    async createUser(username: string,password: string,fullName: string) {

        const existingUser = await this.findByUsername(username);

        if (existingUser) {
            throw new ConflictException(
                'Username already exists',
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = this.userRepository.create({
            username,
            password: hashedPassword,
            fullName,
            role: 'STUDENT',
        });

        return this.userRepository.save(user);
    }
}