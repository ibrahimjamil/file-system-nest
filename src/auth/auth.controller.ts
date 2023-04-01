import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: any) {
       return req.user;
    }

    @Get('protected')
    async getHello(@Req() req: any) {
        return req.user;
     }

     @Post('signIn')
     async postUser(@Body() body: any) {
      return this.authService.signIn(body.email, body.password)
     }
}
