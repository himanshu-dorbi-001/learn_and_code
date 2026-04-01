import { Budget } from '../domain/models/Budget';
import { BudgetService } from '../services/BudgetService';

export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  async setBudget(userId: string, category: string, limit: number, month: string): Promise<Budget> {
    return this.budgetService.setBudget(userId, category, limit, month);
  }

  async checkBudgetStatus(userId: string, category: string, month: string) {
    return this.budgetService.checkBudgetStatus(userId, category, month);
  }
}
