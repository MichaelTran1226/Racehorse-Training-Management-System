import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class HorsesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.horse.findMany({
      include: {
        stall: true,
        owner: { select: { id: true, fullName: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, currentUser?: { id: string; role: Role }) {
    const horse = await this.prisma.horse.findUnique({
      where: { id },
      include: {
        stall: true,
        owner: { select: { id: true, fullName: true, email: true } },
        medicalRecords: { take: 5, orderBy: { createdAt: 'desc' } },
        careSchedules: { where: { isCompleted: false } },
      },
    });

    if (!horse) {
      throw new NotFoundException(`Horse with ID ${id} not found`);
    }

    // Owner Isolation Rule
    if (currentUser && currentUser.role === Role.HORSE_OWNER && horse.ownerId !== currentUser.id) {
      throw new ForbiddenException('Access denied: You do not own this horse.');
    }

    return horse;
  }
}
