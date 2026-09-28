import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/users.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {

        const { username, password } = loginDto;

        const user = await this.usersService.findByUsername(username);

        if (!user) {
            throw new UnauthorizedException(
                'Invalid username or password',
            );
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password,
        );

        if (!passwordMatches) {
            throw new UnauthorizedException(
                'Invalid username or password',
            );
        }

        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role,
        };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            access_token: accessToken,
            user: {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                role: user.role,
            },
        };
    }

    async register(registerDto: RegisterDto) {

        const {
            username,
            password,
            fullName,
        } = registerDto;

        const existingUser =
            await this.usersService.findByUsername(username);

        if (existingUser) {
            throw new ConflictException(
                'Username already exists',
            );
        }

        const user = await this.usersService.createUser(
            username,
            password,
            fullName,
        );

        return {
            message: 'User created successfully',
            user: {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                role: user.role,
            },
        };
    }
}