import { Budget } from '../models/Budget';

export interface IBudgetRepository {
  save(budget: Budget): Promise<void>;
  findById(id: string): Promise<Budget | null>;
  findByUserId(userId: string): Promise<Budget[]>;
  findByUserIdAndMonth(userId: string, month: string): Promise<Budget[]>;
  findByUserIdCategoryAndMonth(userId: string, category: string, month: string): Promise<Budget | null>;
  delete(id: string): Promise<void>;
}
