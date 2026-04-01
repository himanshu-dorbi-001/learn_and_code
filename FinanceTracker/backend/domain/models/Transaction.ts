import { Money } from './Money';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export class Transaction {
  private readonly id: string;
  private readonly userId: string;
  private readonly type: TransactionType;
  private readonly amount: Money;
  private readonly category: string;
  private readonly description: string;
  private readonly date: Date;
  private readonly createdAt: Date;

  constructor(
    id: string,
    userId: string,
    type: TransactionType,
    amount: Money,
    category: string,
    description: string,
    date: Date,
    createdAt: Date = new Date()
  ) {
    this.validateTransaction(category, description);
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.amount = amount;
    this.category = category;
    this.description = description;
    this.date = date;
    this.createdAt = createdAt;
  }

  private validateTransaction(category: string, description: string): void {
    if (!category || category.trim().length === 0) {
      throw new Error('Category cannot be empty');
    }
    if (!description || description.trim().length === 0) {
      throw new Error('Description cannot be empty');
    }
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getType(): TransactionType {
    return this.type;
  }

  getAmount(): Money {
    return this.amount;
  }

  getCategory(): string {
    return this.category;
  }

  getDescription(): string {
    return this.description;
  }

  getDate(): Date {
    return this.date;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  isIncome(): boolean {
    return this.type === TransactionType.INCOME;
  }

  isExpense(): boolean {
    return this.type === TransactionType.EXPENSE;
  }
}
