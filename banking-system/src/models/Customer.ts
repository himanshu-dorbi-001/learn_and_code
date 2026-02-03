import { Account } from "./Account.js";
import { Loan } from "./Loan.js";

export class Customer {
  constructor(
    public readonly id: string,
    public name: string,
    public accounts: Account[] = [],
    public loans: Loan[] = []
  ) {}
}
