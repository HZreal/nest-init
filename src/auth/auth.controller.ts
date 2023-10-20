import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SkipJwt } from './skipJwt.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        // instead of using the Record<string, any> type, we should use a DTO class to define the shape of the request body.
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    // @UseGuards(AuthGuard) // AuthModule 的 provider 中已注入 AuthGuard，即所有 AuthModule 中的 endpoint 自动绑定，于是这里无需注入
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }

    @SkipJwt()
    @Get('skipAuth')
    skipAuth(@Req() req) {
        return 'skipAuth';
    }
}
