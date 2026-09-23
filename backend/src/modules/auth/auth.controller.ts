import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ActorRole } from './auth.types';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập vào hệ thống EquiFlow' })
  async login(@Body() body: { email: string; pass: string }) {
    const user = await this.authService.validateUser(body.email, body.pass);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string; fullName: string; role: ActorRole }) { return this.authService.register(body.email, body.password, body.fullName, body.role); }

  @Post('otp/request')
  async requestOtp(@Body() body: { email: string }) { return this.authService.requestOtp(body.email); }

  @Post('otp/verify')
  async verifyOtp(@Body() body: { email: string; code: string; fullName: string; role: ActorRole }) { return this.authService.verifyOtp(body.email, body.code, body.fullName, body.role); }
}
