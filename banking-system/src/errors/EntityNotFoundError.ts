import { ApplicationError } from './ApplicationError';

export class EntityNotFoundError extends ApplicationError {
  constructor(entity: string, identifier: string) {
    super(`${entity} not found: ${identifier}`);
  }
}
