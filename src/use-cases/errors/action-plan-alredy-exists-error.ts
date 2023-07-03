export class ActionPlanAlreadyExistsError extends Error {
  constructor() {
    super("Action Plan already exists!");
  }
}
