import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register-use-case'

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUserUseCase(prismaUsersRepository)
  return registerUseCase
}
