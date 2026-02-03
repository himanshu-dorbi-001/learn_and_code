export class Account {
  constructor(
    public readonly accountNumber: string,
    public balance: number = 0
  ) {}

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit amount must be positive");
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error("Withdrawal amount must be positive");
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
  }

  transfer(amount: number, target: Account): void {
    this.withdraw(amount);
    target.deposit(amount);
  }
}
