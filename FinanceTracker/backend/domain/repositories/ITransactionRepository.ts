import { Transaction } from '../models/Transaction';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<void>;
  findById(id: string): Promise<Transaction | null>;
  findByUserId(userId: string): Promise<Transaction[]>;
  findByUserIdAndDateRange(userId: string, startDate: Date, endDate: Date): Promise<Transaction[]>;
  findByUserIdAndCategory(userId: string, category: string): Promise<Transaction[]>;
  delete(id: string): Promise<void>;
}
