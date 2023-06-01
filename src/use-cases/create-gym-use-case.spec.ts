import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUserUseCase } from './create-gym-use-case'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUserUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUserUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Java Gym',
      description: null,
      phone: null,
      latitude: -3.0262587,
      longitude: -59.9579142,
    })
    expect(gym.id).not.toBeNull()
  })
})
