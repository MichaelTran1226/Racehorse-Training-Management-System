import { Module } from '@nestjs/common';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { HorsesModule } from './modules/horses/horses.module';
import { TrainingModule } from './modules/training/training.module';
import { HealthModule } from './modules/health/health.module';
import { StablesModule } from './modules/stables/stables.module';
import { RacingModule } from './modules/racing/racing.module';
import { AuditLogModule } from './modules/audit-log/audit-log.module';

@Module({
  imports: [
    PrismaModule,
    AuditLogModule,
    AuthModule,
    AccountsModule,
    HorsesModule,
    TrainingModule,
    HealthModule,
    StablesModule,
    RacingModule,
  ],
})
export class AppModule {}
