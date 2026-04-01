import { Budget } from '../domain/models/Budget';
import { Money } from '../domain/models/Money';
import { Transaction, TransactionType } from '../domain/models/Transaction';
import { IBudgetRepository } from '../domain/repositories/IBudgetRepository';
import { ITransactionRepository } from '../domain/repositories/ITransactionRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { INotificationService } from '../domain/services/INotificationService';
import { EntityNotFoundError, BudgetExceededError, ValidationError } from '../domain/errors/ApplicationError';
import { v4 as uuidv4 } from 'uuid';

export class BudgetService {
  constructor(
    private budgetRepository: IBudgetRepository,
    private transactionRepository: ITransactionRepository,
    private userRepository: IUserRepository,
    private notificationService: INotificationService
  ) {}

  async setBudget(userId: string, category: string, limitAmount: number, month: string): Promise<Budget> {
    // Validate user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }

    // Validate amount
    if (limitAmount <= 0) {
      throw new ValidationError('Budget limit must be greater than zero');
    }

    const budgetId = uuidv4();
    const money = new Money(limitAmount);
    const budget = new Budget(budgetId, userId, category, money, month);

    await this.budgetRepository.save(budget);
    return budget;
  }

  async getBudgetsByUserId(userId: string): Promise<Budget[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }
    return await this.budgetRepository.findByUserId(userId);
  }

  async getBudgetsByMonth(userId: string, month: string): Promise<Budget[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }
    return await this.budgetRepository.findByUserIdAndMonth(userId, month);
  }

  async checkBudgetStatus(userId: string, category: string, month: string): Promise<{ isExceeded: boolean; spent: number; limit: number; remaining: number }> {
    const budget = await this.budgetRepository.findByUserIdCategoryAndMonth(userId, category, month);
    if (!budget) {
      throw new EntityNotFoundError('Budget', `${category} for ${month}`);
    }

    const spent = await this.calculateSpentForCategory(userId, category, month);
    const spentMoney = new Money(spent);
    const isExceeded = budget.isBudgetExceeded(spentMoney);

    if (isExceeded) {
      await this.notificationService.sendBudgetExceededAlert(
        userId,
        category,
        budget.getLimit().getAmount(),
        spent
      );
    }

    const remaining = budget.getRemainingBudget(spentMoney);

    return {
      isExceeded,
      spent,
      limit: budget.getLimit().getAmount(),
      remaining: remaining.getAmount()
    };
  }

  private async calculateSpentForCategory(userId: string, category: string, month: string): Promise<number> {
    const transactions = await this.transactionRepository.findByUserIdAndCategory(userId, category);

    let totalSpent = 0;
    const [year, monthStr] = month.split('-').map(Number);

    for (const transaction of transactions) {
      const transactionDate = new Date(transaction.getDate());
      if (
        transactionDate.getFullYear() === year &&
        transactionDate.getMonth() === monthStr - 1 &&
        transaction.isExpense()
      ) {
        totalSpent += transaction.getAmount().getAmount();
      }
    }

    return totalSpent;
  }
}