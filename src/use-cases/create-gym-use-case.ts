import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseReply {
  gym: Gym
}

export class CreateGymUserUseCase {
  constructor(private gymsRepository: GymsRepository) {}
  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseReply> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
    return { gym }
  }
}
