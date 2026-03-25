import { ApplicationError } from './ApplicationError';

export class InsufficientFundsError extends ApplicationError {
  constructor(accountNumber: string, requested: number, available: number) {
    super(`Insufficient funds for account ${accountNumber}: requested ${requested}, available ${available}`);
  }
}
