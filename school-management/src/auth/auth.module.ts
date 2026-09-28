import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        UsersModule,

        PassportModule,

        JwtModule.registerAsync({
            imports: [
                ConfigModule,
            ],

            inject: [
                ConfigService,
            ],

            useFactory: (
                configService: ConfigService,
            ) => ({
                secret: configService.getOrThrow<string>(
                    'JWT_SECRET',
                ),

                signOptions: {
                    expiresIn: '15m',
                },
            }),
        }),
    ],

    controllers: [
        AuthController,
    ],

    providers: [
        AuthService,
        JwtStrategy,
    ],
})
export class AuthModule {}