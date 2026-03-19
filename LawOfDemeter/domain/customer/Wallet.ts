export class Wallet {
  private value: number;

  constructor(initialValue: number) {
    this.value = initialValue;
  }

  hasEnoughMoney(amount: number): boolean {
    return this.value >= amount;
  }

  subtractMoney(amount: number): void {
    this.value -= amount;
  }

  getBalance(): number {
    return this.value;
  }
}
