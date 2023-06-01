import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { UserAlreadExistsError } from './errors/user-alread-exists-error'
import { RegisterUserUseCase } from './register-use-case'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })
    expect(user.id).not.toBeNull()
    expect(user.created_at).toBeInstanceOf(Date)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to register with same email twich', async () => {
    const email = 'johndoe@email.com'
    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })
    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadExistsError)
  })
})
