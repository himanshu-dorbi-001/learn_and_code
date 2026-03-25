import { Money } from "../models/Money";
import { TransferTransaction } from "../models/Transaction";
import { AccountService } from "./AccountService";
import { InvalidOperationError } from "../errors/InvalidOperationError";
import { InsufficientFundsError } from "../errors/InsufficientFundsError";

export class TransferService {
  constructor(private accountService: AccountService) {}

  transferBetweenAccounts(fromAccountNumber: string, toAccountNumber: string, amount: number): void {
    if (fromAccountNumber === toAccountNumber) {
      throw new InvalidOperationError("Cannot transfer to the same account");
    }

    const fromAccount = this.accountService.findAccount(fromAccountNumber);
    const toAccount = this.accountService.findAccount(toAccountNumber);

    const money = new Money(amount);
    const fromBalance = fromAccount.getBalance().getValue();

    if (amount > fromBalance) {
      throw new InsufficientFundsError(fromAccountNumber, amount, fromBalance);
    }

    const newFromBalance = new Money(fromBalance - amount);
    const newToBalance = new Money(toAccount.getBalance().getValue() + amount);

    fromAccount.setBalance(newFromBalance);
    toAccount.setBalance(newToBalance);

    const transaction = new TransferTransaction(money, fromAccountNumber, toAccountNumber);
    fromAccount.addTransaction(transaction);
    toAccount.addTransaction(transaction);
  }
}
