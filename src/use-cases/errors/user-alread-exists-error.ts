export class UserAlreadExistsError extends Error {
  constructor() {
    super('E-mail alread exists!')
  }
}
