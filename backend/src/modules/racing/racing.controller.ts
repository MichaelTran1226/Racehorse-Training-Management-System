import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RacingService } from './racing.service';

@ApiTags('Racing & Awards (Flow 5)')
@Controller('racing')
export class RacingController {
  constructor(private readonly racingService: RacingService) {}

  @Get('entries')
  @ApiOperation({ summary: 'Lấy danh sách ngựa đăng ký giải đua' })
  getRaceEntries() {
    return this.racingService.getRaceEntries();
  }

  @Post('entries')
  @ApiOperation({ summary: 'Đăng ký chiến mã tham gia giải đua' })
  registerHorseForRace(@Body() body: any) {
    return this.racingService.registerHorseForRace(body);
  }
}
