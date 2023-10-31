export class UserRequestNotFoundError extends Error {
  constructor() {
    super("User Request not found!");
  }
}
