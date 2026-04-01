import { INotificationService } from '../domain/services/INotificationService';

export class EmailNotificationAdapter implements INotificationService {

  async sendBudgetExceededAlert(userId: string, category: string, limit: number, spent: number): Promise<void> {
    const message = `Alert: Budget exceeded for category "${category}". Limit: $${limit}, Spent: $${spent}`;
    await this.sendNotification(userId, message);
  }

  async sendNotification(userId: string, message: string): Promise<void> {
    // Simulated email sending
    console.log(`[EMAIL NOTIFICATION] User: ${userId}`);
    console.log(`[EMAIL NOTIFICATION] Message: ${message}`);
    // In production, this would integrate with an actual email service like SendGrid, AWS SES, etc.
    await this.simulateEmailDelay();
  }

  private async simulateEmailDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 100));
  }
}