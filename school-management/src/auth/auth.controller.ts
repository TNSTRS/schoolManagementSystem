import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(
        @Body() body: {
            username: string;
            password: string;
        },
    ) {
        return this.authService.login(
            body.username,
            body.password
        )
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(
        @Body() body: {
            username: string;
            password: string;
            fullName: string;
        },
    ) {
        return this.authService.register(
            body.username,
            body.password,
            body.fullName
        )
    }

}
