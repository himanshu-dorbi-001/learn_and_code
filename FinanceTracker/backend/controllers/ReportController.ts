import { ReportService } from '../services/ReportService';

export class ReportController {
  constructor(private reportService: ReportService) {}

  async generateMonthlySummary(userId: string, month: string) {
    return this.reportService.generateMonthlySummary(userId, month);
  }

  async generateCategorySummary(userId: string, month: string) {
    return this.reportService.generateCategorySummary(userId, month);
  }
}
