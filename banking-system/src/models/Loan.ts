export class Loan {
  constructor(
    public readonly loanId: string,
    public principal: number,
    public interestRate: number,
    public termInYears: number
  ) {}

  calculateTotalRepayment(): number {
    const interest = this.principal * (this.interestRate / 100) * this.termInYears;
    return this.principal + interest;
  }
}
