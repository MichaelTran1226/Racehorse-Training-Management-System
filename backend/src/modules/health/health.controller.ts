import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health & Medical Locks (Flow 3)')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Post('horses/:id/lock')
  @ApiOperation({ summary: 'Kích hoạt lệnh Khóa Huấn Luyện (Training Lock) cho ngựa chấn thương' })
  lockHorse(
    @Param('id') horseId: string,
    @Body() body: { vetId: string; reason: string }
  ) {
    return this.healthService.lockHorse(horseId, body.vetId, body.reason);
  }

  @Post('horses/:id/release-lock')
  @ApiOperation({ summary: 'Giải trừ lệnh Khóa Huấn Luyện sau khi ngựa bình phục' })
  releaseLock(@Param('id') horseId: string) {
    return this.healthService.releaseLock(horseId);
  }
}
