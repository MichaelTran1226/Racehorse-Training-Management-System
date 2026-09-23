import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { HealthService } from '../health/health.service';

@Injectable()
export class TrainingService {
  constructor(
    private prisma: PrismaService,
    private healthService: HealthService // Inject HealthService thay vì query trực tiếp MedicalRecord
  ) {}

  async createPlan(data: {
    horseId: string;
    title: string;
    objective: string;
    distanceMeters: number;
    intensity: string;
    surfaceType: string;
    startDate: Date;
    endDate: Date;
  }) {
    // Kiểm tra quy tắc an toàn: Không tạo giáo án cho ngựa đang bị Training Lock
    const isLocked = await this.healthService.isHorseLocked(data.horseId);
    if (isLocked) {
      throw new BadRequestException(
        'Horse is under medical training lock. Cannot schedule training for an injured horse.'
      );
    }

    return this.prisma.trainingPlan.create({ data });
  }

  async findPlansByHorse(horseId: string) {
    return this.prisma.trainingPlan.findMany({
      where: { horseId },
      include: { sessions: true },
      orderBy: { startDate: 'desc' },
    });
  }
}
