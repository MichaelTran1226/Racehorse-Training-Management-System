import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HorsesService } from './horses.service';

@ApiTags('Horses (Flow 1)')
@Controller('horses')
export class HorsesController {
  constructor(private readonly horsesService: HorsesService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả ngựa trong câu lạc bộ' })
  findAll() {
    return this.horsesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xem hồ sơ chi tiết một con ngựa' })
  findOne(@Param('id') id: string) {
    return this.horsesService.findOne(id);
  }
}
