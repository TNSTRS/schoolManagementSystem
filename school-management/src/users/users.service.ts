import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async findByUsername(username: string){
        return this.userRepository.findOne({
            where: {username}
        })
    }


    async createUser(username: string, password: string, fullName: string){
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            username, password: hashedPassword, fullName
        })

        return this.userRepository.save(user)
    }

}
