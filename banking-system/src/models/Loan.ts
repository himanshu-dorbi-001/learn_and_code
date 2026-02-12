export class Loan {
  constructor(
    public readonly loanId: string,
    public principal: number,
    public interestRate: number,
    public termInYears: number,
  ) {}
}
