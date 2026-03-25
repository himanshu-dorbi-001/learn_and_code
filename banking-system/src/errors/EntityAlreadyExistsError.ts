import { ApplicationError } from './ApplicationError';

export class EntityAlreadyExistsError extends ApplicationError {
  constructor(entity: string, identifier: string) {
    super(`${entity} already exists: ${identifier}`);
  }
}
