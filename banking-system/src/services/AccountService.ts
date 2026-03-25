import { Account } from "../models/Account";
import { Money } from "../models/Money";
import { DepositTransaction, WithdrawalTransaction } from "../models/Transaction";
import { CustomerService } from "./CustomerService";
import { EntityAlreadyExistsError } from "../errors/EntityAlreadyExistsError";
import { EntityNotFoundError } from "../errors/EntityNotFoundError";
import { InsufficientFundsError } from "../errors/InsufficientFundsError";

export class AccountService {
  constructor(private customerService: CustomerService) {}

  createAccount(customerId: string, accountNumber: string, initialBalance: number = 0): Account {
    const customer = this.customerService.getCustomer(customerId);
    if (customer.hasAccount(accountNumber)) {
      throw new EntityAlreadyExistsError('Account', accountNumber);
    }
    const money = new Money(initialBalance);
    const newAccount = new Account(accountNumber, money);
    customer.addAccount(newAccount);
    return newAccount;
  }

  depositToAccount(accountNumber: string, amount: number): void {
    const account = this.findAccount(accountNumber);
    const money = new Money(amount);
    const currentBalance = account.getBalance().getValue();
    const newBalance = new Money(currentBalance + amount);
    account.setBalance(newBalance);

    const transaction = new DepositTransaction(money);
    account.addTransaction(transaction);
  }

  withdrawFromAccount(accountNumber: string, amount: number): void {
    const account = this.findAccount(accountNumber);
    const money = new Money(amount);
    const currentBalance = account.getBalance().getValue();

    if (amount > currentBalance) {
      throw new InsufficientFundsError(accountNumber, amount, currentBalance);
    }

    const newBalance = new Money(currentBalance - amount);
    account.setBalance(newBalance);

    const transaction = new WithdrawalTransaction(money);
    account.addTransaction(transaction);
  }

  getAccountBalance(accountNumber: string): number {
    const account = this.findAccount(accountNumber);
    return account.getBalance().getValue();
  }

  findAccount(accountNumber: string): Account {
    const allCustomers = this.customerService.getAllCustomers();
    for (const customer of allCustomers) {
      if (customer.hasAccount(accountNumber)) {
        return customer.getAccount(accountNumber);
      }
    }
    throw new EntityNotFoundError('Account', accountNumber);
  }
}
