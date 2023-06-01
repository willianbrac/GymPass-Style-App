import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUserUseCase } from './check-in-use-case'
import { randomUUID } from 'crypto'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/binary'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUserUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUserUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()

    await gymsRepository.create({
      id: '83338a11-0cf4-43b3-a777-ce908d526930',
      title: 'Java Gym',
      description: null,
      phone: null,
      latitude: -3.0262587,
      longitude: -59.9579142,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      user_id: randomUUID(),
      gym_id: '83338a11-0cf4-43b3-a777-ce908d526930',
      userLatitude: -3.0262587,
      userLongitude: -59.9579142,
    })
    expect(checkIn.id).not.toBeNull()
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 13, 8, 0, 0))
    const user_id = randomUUID()
    await sut.execute({
      user_id,
      gym_id: '83338a11-0cf4-43b3-a777-ce908d526930',
      userLatitude: -3.0262587,
      userLongitude: -59.9579142,
    })

    await expect(() =>
      sut.execute({
        user_id,
        gym_id: '83338a11-0cf4-43b3-a777-ce908d526930',
        userLatitude: -3.0262587,
        userLongitude: -59.9579142,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 13, 8, 0, 0))
    const user_id = randomUUID()
    await sut.execute({
      user_id,
      gym_id: '83338a11-0cf4-43b3-a777-ce908d526930',
      userLatitude: -3.0262587,
      userLongitude: -59.9579142,
    })

    vi.setSystemTime(new Date(2022, 0, 14, 8, 0, 0))
    const { checkIn } = await sut.execute({
      user_id,
      gym_id: '83338a11-0cf4-43b3-a777-ce908d526930',
      userLatitude: -3.0262587,
      userLongitude: -59.9579142,
    })
    expect(checkIn.id).not.toBeNull()
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: '702dd008-4385-4ebb-a941-833a3268e2d7',
      title: 'React GYM',
      description: '',
      phone: '',
      latitude: new Decimal(-3.0262587),
      longitude: new Decimal(-59.9579142),
    })

    await expect(() =>
      sut.execute({
        user_id: randomUUID(),
        gym_id: '83338a11-0cf4-43b3-a777-ce908d526930',
        userLatitude: -3.0605312,
        userLongitude: -59.9851008,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
