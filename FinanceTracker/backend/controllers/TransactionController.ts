import { Transaction, TransactionType } from '../domain/models/Transaction';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  async addTransaction(
    userId: string,
    type: TransactionType,
    amount: number,
    category: string,
    description: string,
    date: Date
  ): Promise<Transaction> {
    return this.transactionService.addTransaction(userId, type, amount, category, description, date);
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionService.getTransactionsByUserId(userId);
  }
}
