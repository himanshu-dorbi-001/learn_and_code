import { ApplicationError } from './ApplicationError';

export class InvalidOperationError extends ApplicationError {
  constructor(message: string) {
    super(message);
  }
}
