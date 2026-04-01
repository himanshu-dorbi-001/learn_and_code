import { Money } from './Money';

export class Budget {
  private readonly id: string;
  private readonly userId: string;
  private readonly category: string;
  private readonly limit: Money;
  private readonly month: string; // Format: YYYY-MM
  private readonly createdAt: Date;

  constructor(
    id: string,
    userId: string,
    category: string,
    limit: Money,
    month: string,
    createdAt: Date = new Date()
  ) {
    this.validateBudget(category, month);
    this.id = id;
    this.userId = userId;
    this.category = category;
    this.limit = limit;
    this.month = month;
    this.createdAt = createdAt;
  }

  private validateBudget(category: string, month: string): void {
    if (!category || category.trim().length === 0) {
      throw new Error('Category cannot be empty');
    }
    if (!this.isValidMonth(month)) {
      throw new Error('Invalid month format. Use YYYY-MM');
    }
  }

  private isValidMonth(month: string): boolean {
    const monthRegex = /^\d{4}-\d{2}$/;
    return monthRegex.test(month);
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getCategory(): string {
    return this.category;
  }

  getLimit(): Money {
    return this.limit;
  }

  getMonth(): string {
    return this.month;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  isBudgetExceeded(spent: Money): boolean {
    return spent.isGreaterThan(this.limit);
  }

  getRemainingBudget(spent: Money): Money {
    try {
      return this.limit.subtract(spent);
    } catch {
      // Budget exceeded, return zero remaining
      return new Money(0, this.limit.getCurrency());
    }
  }
}
