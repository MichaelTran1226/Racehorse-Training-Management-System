import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DEMO_ACCOUNTS, ActorRole } from './auth.types';
import { OtpStore } from './otp.store';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private otpStore: OtpStore
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const demo = DEMO_ACCOUNTS.find((account) => account.email === email.trim().toLowerCase());
    if (demo && demo.password === pass) return { id: `demo-${demo.role.toLowerCase()}`, email: demo.email, fullName: demo.fullName, role: demo.role };
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.isLocked) {
      return null;
    }
    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (isMatch) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  register(email: string, password: string, fullName: string, role: ActorRole = 'HORSE_OWNER') {
    if (role !== 'HORSE_OWNER') throw new ForbiddenException('Only Horse Owners can self-register');
    const existing = DEMO_ACCOUNTS.find((account) => account.email === email.trim().toLowerCase());
    if (existing) throw new BadRequestException('Account already exists');
    this.otpStore.issue(email);
    return { requiresOtp: true, email: email.trim().toLowerCase(), fullName, role: 'HORSE_OWNER', developmentOtp: '123456' };
  }

  requestOtp(email: string) { return { email: email.trim().toLowerCase(), ...this.otpStore.issue(email), developmentOnly: true }; }

  verifyOtp(email: string, code: string, fullName: string, role: ActorRole) {
    if (role !== undefined && role !== 'HORSE_OWNER') throw new ForbiddenException('Only Horse Owners can self-register');
    if (!this.otpStore.verify(email, code)) throw new UnauthorizedException('OTP_INVALID');
    return this.login({ id: `local-${Date.now()}`, email: email.trim().toLowerCase(), fullName, role: 'HORSE_OWNER' });
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
