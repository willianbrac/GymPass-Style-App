import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserCheckInsUseCaseRequest {
  user_id: string
  page: number
}
interface FetchUserCheckInsUseCaseReply {
  checkIns: CheckIn[]
}
export class FetchUserCheckInsUserUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({
    user_id,
    page,
  }: FetchUserCheckInsUseCaseRequest): Promise<FetchUserCheckInsUseCaseReply> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      user_id,
      page,
    )
    return { checkIns }
  }
}
