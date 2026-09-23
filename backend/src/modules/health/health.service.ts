import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { HealthStatus } from '@prisma/client';

@Injectable()
export class HealthService {
  constructor(private prisma: PrismaService) {}

  /**
   * Phương thức public để module Training (Flow 2) kiểm tra trạng thái khóa tập luyện
   */
  async isHorseLocked(horseId: string): Promise<boolean> {
    const horse = await this.prisma.horse.findUnique({
      where: { id: horseId },
      select: { isTrainingLocked: true, healthStatus: true },
    });

    if (!horse) {
      throw new NotFoundException(`Horse with ID ${horseId} not found`);
    }

    return horse.isTrainingLocked || horse.healthStatus === HealthStatus.INJURED;
  }

  /**
   * Đặt lệnh Khóa huấn luyện khẩn cấp (Training Lock)
   */
  async lockHorse(horseId: string, vetId: string, reason: string) {
    return this.prisma.horse.update({
      where: { id: horseId },
      data: {
        isTrainingLocked: true,
        healthStatus: HealthStatus.INJURED,
        lockedByVetId: vetId,
        lockReason: reason,
        lockedAt: new Date(),
      },
    });
  }

  /**
   * Giải trừ lệnh Khóa huấn luyện (Release Lock)
   */
  async releaseLock(horseId: string) {
    return this.prisma.horse.update({
      where: { id: horseId },
      data: {
        isTrainingLocked: false,
        healthStatus: HealthStatus.FIT,
        lockedByVetId: null,
        lockReason: null,
        lockedAt: null,
      },
    });
  }
}
