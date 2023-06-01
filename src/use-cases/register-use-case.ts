import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UserAlreadExistsError } from './errors/user-alread-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseReply {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseReply> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) throw new UserAlreadExistsError()
    const password_hash = await hash(password, 6)
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
    return { user }
  }
}
