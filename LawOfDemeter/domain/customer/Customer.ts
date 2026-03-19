import { Wallet } from "./Wallet";

export class Customer {
  private firstName: string;
  private lastName: string;
  private wallet: Wallet;

  constructor(firstName: string, lastName: string, wallet: Wallet) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.wallet = wallet;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // "Tell, Don't Ask" — Customer controls its own internals
  pay(amount: number): boolean {
    if (this.wallet.hasEnoughMoney(amount)) {
      this.wallet.subtractMoney(amount);
      return true;
    }
    return false;
  }
}
