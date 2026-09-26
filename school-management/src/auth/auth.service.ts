import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async login(username: string, password: string) {
        
        const user = await this.userService.findByUsername(username)

        if(!user) {
            throw new UnauthorizedException('Invalid username or password')
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        )

        if(!passwordMatches){
            throw new UnauthorizedException('Invalid username or password')
        }

        const payload = {
            sub: user.id,
            username: user.username
        }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async register(username: string, password: string, fullName: string){
        if(username == null || password == null){
            throw new NotAcceptableException('Username and Password are required!')
        }

        const user = await this.userService.createUser(username, password, fullName)

        if(user != null){
            console.log('user created!')
        }
    }

}
