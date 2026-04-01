import { Transaction, TransactionType } from '../domain/models/Transaction';
import { Money } from '../domain/models/Money';
import { ITransactionRepository } from '../domain/repositories/ITransactionRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { EntityNotFoundError } from '../domain/errors/ApplicationError';

export class ReportService {
  constructor(
    private transactionRepository: ITransactionRepository,
    private userRepository: IUserRepository
  ) {}

  async generateMonthlySummary(userId: string, month: string): Promise<{
    totalIncome: number;
    totalExpense: number;
    savings: number;
    transactionCount: number;
  }> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }

    const transactions = await this.transactionRepository.findByUserId(userId);
    const [year, monthStr] = month.split('-').map(Number);

    let totalIncome = 0;
    let totalExpense = 0;
    let transactionCount = 0;

    for (const transaction of transactions) {
      const transactionDate = new Date(transaction.getDate());
      if (transactionDate.getFullYear() === year && transactionDate.getMonth() === monthStr - 1) {
        const amount = transaction.getAmount().getAmount();

        if (transaction.isIncome()) {
          totalIncome += amount;
        } else {
          totalExpense += amount;
        }

        transactionCount++;
      }
    }

    const savings = totalIncome - totalExpense;

    return {
      totalIncome,
      totalExpense,
      savings,
      transactionCount
    };
  }

  async generateCategorySummary(userId: string, month: string): Promise<Record<string, { income: number; expense: number; total: number }>> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }

    const transactions = await this.transactionRepository.findByUserId(userId);
    const [year, monthStr] = month.split('-').map(Number);

    const categorySummary: Record<string, { income: number; expense: number; total: number }> = {};

    for (const transaction of transactions) {
      const transactionDate = new Date(transaction.getDate());
      if (transactionDate.getFullYear() === year && transactionDate.getMonth() === monthStr - 1) {
        const category = transaction.getCategory();
        const amount = transaction.getAmount().getAmount();

        if (!categorySummary[category]) {
          categorySummary[category] = { income: 0, expense: 0, total: 0 };
        }

        if (transaction.isIncome()) {
          categorySummary[category].income += amount;
        } else {
          categorySummary[category].expense += amount;
        }

        categorySummary[category].total = categorySummary[category].income - categorySummary[category].expense;
      }
    }

    return categorySummary;
  }
}