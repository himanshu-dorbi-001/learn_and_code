export class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when a requested entity is not found.
 */
export class EntityNotFoundError extends ApplicationError {
  constructor(entity: string, identifier: string) {
    super(`${entity} not found: ${identifier}`);
  }
}

/**
 * Thrown when an entity already exists.
 */
export class EntityAlreadyExistsError extends ApplicationError {
  constructor(entity: string, identifier: string) {
    super(`${entity} already exists: ${identifier}`);
  }
}

/**
 * Thrown when business validation fails.
 */
export class ValidationError extends ApplicationError {
  constructor(message: string) {
    super(`Validation error: ${message}`);
  }
}

/**
 * Thrown when budget is exceeded.
 */
export class BudgetExceededError extends ApplicationError {
  constructor(category: string, limit: number, spent: number) {
    super(`Budget exceeded for ${category}. Limit: ${limit}, Spent: ${spent}`);
  }
}

/**
 * Thrown when external service fails.
 */
export class ExternalServiceError extends ApplicationError {
  constructor(service: string, message: string) {
    super(`${service} service error: ${message}`);
  }
}
