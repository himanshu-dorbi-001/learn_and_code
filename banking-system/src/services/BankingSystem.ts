import { Customer } from "../models/Customer.js";
import { Account } from "../models/Account.js";
import { Loan } from "../models/Loan.js";

export class BankingSystem {
  private customers: Map<string, Customer> = new Map();

  addCustomer(customer: Customer): void {
    if (this.customers.has(customer.id)) {
      throw new Error("Customer already exists");
    }
    this.customers.set(customer.id, customer);
  }

  getCustomer(id: string): Customer {
    const customer = this.customers.get(id);
    if (!customer) throw new Error("Customer not found");
    return customer;
  }

  openAccount(customerId: string, accountNumber: string): Account {
    const customer = this.getCustomer(customerId);
    const account = new Account(accountNumber);
    customer.accounts.push(account);
    return account;
  }

  applyLoan(
    customerId: string,
    loanId: string,
    principal: number,
    rate: number,
    term: number,
  ): Loan {
    const customer = this.getCustomer(customerId);
    const loan = new Loan(loanId, principal, rate, term);
    customer.loans.push(loan);
    return loan;
  }

  private findAccount(accountNumber: string): Account {
    for (const customer of this.customers.values()) {
      const acc = customer.accounts.find((a) => a.accountNumber === accountNumber);
      if (acc) return acc;
    }
    throw new Error("Account not found");
  }

  deposit(accountNumber: string, amount: number): void {
    const account = this.findAccount(accountNumber);
    account.deposit(amount);
  }

  withdraw(accountNumber: string, amount: number): void {
    const account = this.findAccount(accountNumber);
    account.withdraw(amount);
  }

  transfer(fromAccountNumber: string, toAccountNumber: string, amount: number): void {
    const from = this.findAccount(fromAccountNumber);
    const to = this.findAccount(toAccountNumber);
    from.transfer(amount, to);
  }

  getBalance(accountNumber: string): number {
    const account = this.findAccount(accountNumber);
    return account.balance;
  }
}
