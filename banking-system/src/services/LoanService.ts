import { Loan } from "../models/Loan";
import { CustomerService } from "./CustomerService";

export class LoanService {
  constructor(private customerService: CustomerService) {}

  applyLoan(customerId: string, loanId: string, principal: number, rate: number, termInMonths: number): Loan {
    const customer = this.customerService.getCustomer(customerId);
    const termInYears = termInMonths / 12;
    const newLoan = new Loan(loanId, principal, rate, termInYears);
    customer.addLoan(newLoan);
    return newLoan;
  }

  getLoan(customerId: string, loanId: string): Loan {
    const customer = this.customerService.getCustomer(customerId);
    return customer.getLoan(loanId);
  }

  calculateMonthlyPayment(principal: number, annualRate: number, termInMonths: number): number {
    const termInYears = termInMonths / 12;
    const simpleInterest = principal * (annualRate / 100) * termInYears;
    const totalRepayment = principal + simpleInterest;
    return totalRepayment / termInMonths;
  }

  calculateTotalRepayment(principal: number, annualRate: number, termInMonths: number): number {
    const termInYears = termInMonths / 12;
    const simpleInterest = principal * (annualRate / 100) * termInYears;
    return principal + simpleInterest;
  }
}
