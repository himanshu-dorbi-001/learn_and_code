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

  private validateAmount(amount: any) {
    if (typeof amount !== "number" || !isFinite(amount)) throw new Error("Amount must be a number");
    if (amount <= 0) throw new Error("Amount must be greater than zero");
  }

  deposit(accountNumber: string, amount: number): void {
    this.validateAmount(amount);
    const account = this.findAccount(accountNumber);
    account.balance += amount;
  }

  withdraw(accountNumber: string, amount: number): void {
    this.validateAmount(amount);
    const account = this.findAccount(accountNumber);
    if (amount > account.balance) throw new Error("Insufficient funds");
    account.balance -= amount;
  }

  transfer(fromAccountNumber: string, toAccountNumber: string, amount: number): void {
    this.validateAmount(amount);
    if (fromAccountNumber === toAccountNumber) throw new Error("Cannot transfer to same account");
    const from = this.findAccount(fromAccountNumber);
    const to = this.findAccount(toAccountNumber);
    if (amount > from.balance) throw new Error("Insufficient funds");
    from.balance -= amount;
    to.balance += amount;
  }

  calculateLoanRepayment(loan: Loan): number {
    if (typeof loan.principal !== "number" || !isFinite(loan.principal) || loan.principal <= 0) {
      throw new Error("Invalid principal");
    }
    if (typeof loan.interestRate !== "number" || !isFinite(loan.interestRate) || loan.interestRate < 0) {
      throw new Error("Invalid interest rate");
    }
    if (typeof loan.termInYears !== "number" || !isFinite(loan.termInYears) || loan.termInYears <= 0) {
      throw new Error("Invalid term");
    }
    const interest = loan.principal * (loan.interestRate / 100) * loan.termInYears;
    return loan.principal + interest;
  }

  getBalance(accountNumber: string): number {
    const account = this.findAccount(accountNumber);
    return account.balance;
  }
}
