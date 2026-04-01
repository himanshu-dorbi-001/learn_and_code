export interface INotificationService {
  sendBudgetExceededAlert(userId: string, category: string, limit: number, spent: number): Promise<void>;
  sendNotification(userId: string, message: string): Promise<void>;
}
