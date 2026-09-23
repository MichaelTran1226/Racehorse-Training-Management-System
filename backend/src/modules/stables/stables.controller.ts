import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StablesService } from './stables.service';

@ApiTags('Stables & Facilities (Flow 4)')
@Controller('stables')
export class StablesController {
  constructor(private readonly stablesService: StablesService) {}

  @Get('stalls')
  @ApiOperation({ summary: 'Lấy sơ đồ phân bổ vị trí chuồng trại' })
  getStalls() {
    return this.stablesService.getStalls();
  }

  @Post('incidents')
  @ApiOperation({ summary: 'Groom báo cáo sự cố chuồng trại kèm ảnh' })
  reportIncident(@Body() body: any) {
    return this.stablesService.reportIncident(body);
  }
}
