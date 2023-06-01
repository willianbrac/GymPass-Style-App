import { prisma } from '@/lib/prisma'
import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findByUserIdOnDate(
    user_id: string,
    date: Date,
  ): Promise<CheckIn | null> {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({ data })
  }
}
