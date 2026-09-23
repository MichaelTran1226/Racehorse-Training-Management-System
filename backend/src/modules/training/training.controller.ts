import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TrainingService } from './training.service';

@ApiTags('Training Plans (Flow 2)')
@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post('plans')
  @ApiOperation({ summary: 'Tạo giáo án huấn luyện mới (Kiểm tra Training Lock)' })
  createPlan(@Body() body: any) {
    return this.trainingService.createPlan(body);
  }

  @Get('horses/:horseId/plans')
  @ApiOperation({ summary: 'Lấy danh sách giáo án huấn luyện của một con ngựa' })
  findPlansByHorse(@Param('horseId') horseId: string) {
    return this.trainingService.findPlansByHorse(horseId);
  }
}
