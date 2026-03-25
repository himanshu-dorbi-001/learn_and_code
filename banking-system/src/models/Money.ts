export class Money {
  private readonly amount: number;

  constructor(amount: number) {
    this.validateAmount(amount);
    this.amount = amount;
  }

  private validateAmount(amount: number): void {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new Error("amount must be a non-negative number");
    }
  }

  getValue(): number {
    return this.amount;
  }

  getAmount(): number {
    return this.amount;
  }
}
