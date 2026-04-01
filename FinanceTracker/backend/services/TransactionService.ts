import { Transaction, TransactionType } from '../domain/models/Transaction';
import { Money } from '../domain/models/Money';
import { ITransactionRepository } from '../domain/repositories/ITransactionRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { EntityNotFoundError, ValidationError } from '../domain/errors/ApplicationError';
import { v4 as uuidv4 } from 'uuid';

export class TransactionService {
  constructor(
    private transactionRepository: ITransactionRepository,
    private userRepository: IUserRepository
  ) {}

  async addTransaction(
    userId: string,
    type: TransactionType,
    amount: number,
    category: string,
    description: string,
    date: Date
  ): Promise<Transaction> {
    // Validate user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }

    // Validate amount
    if (amount <= 0) {
      throw new ValidationError('Transaction amount must be greater than zero');
    }

    const transactionId = uuidv4();
    const money = new Money(amount);
    const transaction = new Transaction(
      transactionId,
      userId,
      type,
      money,
      category,
      description,
      date
    );

    await this.transactionRepository.save(transaction);
    return transaction;
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }
    return await this.transactionRepository.findByUserId(userId);
  }

  async getTransactionsByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Transaction[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }
    return await this.transactionRepository.findByUserIdAndDateRange(userId, startDate, endDate);
  }

  async getTransactionsByCategory(userId: string, category: string): Promise<Transaction[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }
    return await this.transactionRepository.findByUserIdAndCategory(userId, category);
  }

  async deleteTransaction(transactionId: string): Promise<void> {
    await this.transactionRepository.delete(transactionId);
  }
}