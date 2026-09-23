import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { OtpStore } from './otp.store';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'equiflow-super-secure-production-jwt-key-2026',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, OtpStore],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
