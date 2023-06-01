import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

interface CheckInUseCaseRequest {
  user_id: string
  gym_id: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseReply {
  checkIn: CheckIn
}

export class CheckInUserUseCase {
  constructor(
    private checkinsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    user_id,
    gym_id,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseReply> {
    const gym = await this.gymsRepository.findById(gym_id)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KM = 0.1

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate = await this.checkinsRepository.findByUserIdOnDate(
      user_id,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkinsRepository.create({
      user_id,
      gym_id,
    })

    return {
      checkIn,
    }
  }
}
