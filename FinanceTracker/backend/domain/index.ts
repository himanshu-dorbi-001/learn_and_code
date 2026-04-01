/**
 * Domain Models Index
 * Central exports for all domain entities
 */

export { User } from './models/User';
export { Transaction, TransactionType } from './models/Transaction';
export { Budget } from './models/Budget';
export { Money } from './models/Money';

export {
  ApplicationError,
  EntityNotFoundError,
  EntityAlreadyExistsError,
  ValidationError,
  BudgetExceededError,
  ExternalServiceError
} from './errors/ApplicationError';

export { IUserRepository } from './repositories/IUserRepository';
export { ITransactionRepository } from './repositories/ITransactionRepository';
export { IBudgetRepository } from './repositories/IBudgetRepository';

export { INotificationService } from './services/INotificationService';
export { ICurrencyConversionService } from './services/ICurrencyConversionService';
