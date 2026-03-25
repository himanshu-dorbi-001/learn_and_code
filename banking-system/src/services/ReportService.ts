import { CustomerService } from "./CustomerService";

export class ReportService {
  constructor(private customerService: CustomerService) {}

  getCustomerSummary(customerId: string): Record<string, any> {
    const customer = this.customerService.getCustomer(customerId);
    const totalBalance = customer
      .getAccounts()
      .reduce((total, account) => total + account.getBalance().getValue(), 0);
    const totalLoanAmount = customer.getLoans().reduce((total, loan) => total + loan.getPrincipal(), 0);

    return {
      customerId: customer.getCustomerId(),
      name: customer.getName(),
      createdAt: customer.getCreatedAt(),
      totalAccountBalance: totalBalance,
      totalLoanAmount: totalLoanAmount,
      accountCount: customer.getAccounts().length,
      loanCount: customer.getLoans().length,
    };
  }
}
