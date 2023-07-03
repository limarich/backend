export class ActionPlanNotFoundError extends Error {
  constructor() {
    super("Action Plan not found!");
  }
}
