import { Budget } from '../domain/models/Budget';
import { IBudgetRepository } from '../domain/repositories/IBudgetRepository';
import { EntityNotFoundError } from '../domain/errors/ApplicationError';

export class InMemoryBudgetRepository implements IBudgetRepository {
  private budgets: Map<string, Budget> = new Map();

  async save(budget: Budget): Promise<void> {
    this.budgets.set(budget.getId(), budget);
  }

  async findById(id: string): Promise<Budget | null> {
    return this.budgets.get(id) || null;
  }

  async findByUserId(userId: string): Promise<Budget[]> {
    const result: Budget[] = [];
    for (const budget of this.budgets.values()) {
      if (budget.getUserId() === userId) {
        result.push(budget);
      }
    }
    return result;
  }

  async findByUserIdAndMonth(userId: string, month: string): Promise<Budget[]> {
    const result: Budget[] = [];
    for (const budget of this.budgets.values()) {
      if (budget.getUserId() === userId && budget.getMonth() === month) {
        result.push(budget);
      }
    }
    return result;
  }

  async findByUserIdCategoryAndMonth(userId: string, category: string, month: string): Promise<Budget | null> {
    for (const budget of this.budgets.values()) {
      if (
        budget.getUserId() === userId &&
        budget.getCategory() === category &&
        budget.getMonth() === month
      ) {
        return budget;
      }
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    if (!this.budgets.has(id)) {
      throw new EntityNotFoundError('Budget', id);
    }
    this.budgets.delete(id);
  }
}