import { Transaction } from '../domain/models/Transaction';
import { ITransactionRepository } from '../domain/repositories/ITransactionRepository';
import { EntityNotFoundError } from '../domain/errors/ApplicationError';

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Map<string, Transaction> = new Map();

  async save(transaction: Transaction): Promise<void> {
    this.transactions.set(transaction.getId(), transaction);
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactions.get(id) || null;
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    const result: Transaction[] = [];
    for (const transaction of this.transactions.values()) {
      if (transaction.getUserId() === userId) {
        result.push(transaction);
      }
    }
    return result;
  }

  async findByUserIdAndDateRange(userId: string, startDate: Date, endDate: Date): Promise<Transaction[]> {
    const result: Transaction[] = [];
    for (const transaction of this.transactions.values()) {
      if (
        transaction.getUserId() === userId &&
        transaction.getDate() >= startDate &&
        transaction.getDate() <= endDate
      ) {
        result.push(transaction);
      }
    }
    return result;
  }

  async findByUserIdAndCategory(userId: string, category: string): Promise<Transaction[]> {
    const result: Transaction[] = [];
    for (const transaction of this.transactions.values()) {
      if (transaction.getUserId() === userId && transaction.getCategory() === category) {
        result.push(transaction);
      }
    }
    return result;
  }

  async delete(id: string): Promise<void> {
    if (!this.transactions.has(id)) {
      throw new EntityNotFoundError('Transaction', id);
    }
    this.transactions.delete(id);
  }
}