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
    import { Customer } from "../models/Customer.js";
    import { Account } from "../models/Account.js";
    import { Loan } from "../models/Loan.js";

    export class BankingSystem {
      private customers: Map<string, Customer> = new Map();

      addCustomer(customer: Customer): void {
        if (this.customers.has(customer.id)) {
          throw new Error("customer already exists");
        }
        this.customers.set(customer.id, customer);
      }

      getCustomer(customerId: string): Customer {
        const customer = this.customers.get(customerId);
        if (!customer) throw new Error("customer not found");
        return customer;
      }

      createAccount(customerId: string, accountNumber: string): Account {
        const customer = this.getCustomer(customerId);
        const exists = Array.from(this.customers.values()).some((c) =>
          c.accounts.some((a) => a.accountNumber === accountNumber),
        );
        if (exists) throw new Error("account number already exists");
        const account = new Account(accountNumber);
        customer.accounts.push(account);
        return account;
      }

      applyLoan(customerId: string, loanId: string, principal: number, rate: number, term: number): Loan {
        const customer = this.getCustomer(customerId);
        this.validatePositiveNumber(principal, "principal");
        this.validateNonNegativeNumber(rate, "interest rate");
        this.validatePositiveNumber(term, "termInYears");
        const loan = new Loan(loanId, principal, rate, term);
        customer.loans.push(loan);
        return loan;
      }

      depositToAccount(accountNumber: string, amount: number): void {
        const value = this.validatePositiveNumber(amount, "amount");
        const account = this.findAccount(accountNumber);
        account.balance += value;
      }

      withdrawFromAccount(accountNumber: string, amount: number): void {
        const value = this.validatePositiveNumber(amount, "amount");
        const account = this.findAccount(accountNumber);
        if (value > account.balance) throw new Error("insufficient funds");
        account.balance -= value;
      }

      transferBetweenAccounts(fromAccountNumber: string, toAccountNumber: string, amount: number): void {
        const value = this.validatePositiveNumber(amount, "amount");
        if (fromAccountNumber === toAccountNumber) throw new Error("cannot transfer to same account");
        const from = this.findAccount(fromAccountNumber);
        const to = this.findAccount(toAccountNumber);
        if (value > from.balance) throw new Error("insufficient funds");
        from.balance -= value;
        to.balance += value;
      }

      getAccountBalance(accountNumber: string): number {
        const account = this.findAccount(accountNumber);
        return account.balance;
      }

      calculateLoanRepayment(loan: Loan): number {
        this.validatePositiveNumber(loan.principal, "principal");
        this.validateNonNegativeNumber(loan.interestRate, "interest rate");
        this.validatePositiveNumber(loan.termInYears, "termInYears");
        const interest = loan.principal * (loan.interestRate / 100) * loan.termInYears;
        return loan.principal + interest;
      }

      private findAccount(accountNumber: string): Account {
        for (const customer of this.customers.values()) {
          const account = customer.accounts.find((a) => a.accountNumber === accountNumber);
          if (account) return account;
        }
        throw new Error("account not found");
      }

      private validatePositiveNumber(value: any, name: string): number {
        const num = Number(value);
        if (!Number.isFinite(num) || num <= 0) throw new Error(`${name} must be a positive number`);
        return num;
      }

      private validateNonNegativeNumber(value: any, name: string): number {
        const num = Number(value);
        if (!Number.isFinite(num) || num < 0) throw new Error(`${name} must be a non-negative number`);
        return num;
      }
    }
