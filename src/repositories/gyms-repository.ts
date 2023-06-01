import { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  findById(gym_id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
