export class BusinessModelAlreadyExistsError extends Error {
  constructor() {
    super("Business Model already exists!");
  }
}
