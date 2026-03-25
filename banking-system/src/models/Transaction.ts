import { Money } from "./Money.ts";

export interface Transaction {
  getType(): string;
  getAmount(): Money;
  getDescription(): string;
}

export abstract class BaseTransaction implements Transaction {
  protected readonly timestamp: Date;

  constructor(protected readonly amount: Money) {
    this.timestamp = new Date();
  }

  abstract getType(): string;
  abstract getDescription(): string;

  getAmount(): Money {
    return this.amount;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }
}

export class DepositTransaction extends BaseTransaction {
  getType(): string {
    return "DEPOSIT";
  }

  getDescription(): string {
    return `Deposited ${this.amount.getValue()}`;
  }
}

export class WithdrawalTransaction extends BaseTransaction {
  getType(): string {
    return "WITHDRAWAL";
  }

  getDescription(): string {
    return `Withdrawn ${this.amount.getValue()}`;
  }
}

export class TransferTransaction extends BaseTransaction {
  constructor(
    amount: Money,
    private readonly fromAccountNumber: string,
    private readonly toAccountNumber: string,
  ) {
    super(amount);
  }

  getType(): string {
    return "TRANSFER";
  }

  getDescription(): string {
    return `Transferred ${this.amount.getValue()} from ${this.fromAccountNumber} to ${this.toAccountNumber}`;
  }

  getFromAccountNumber(): string {
    return this.fromAccountNumber;
  }

  getToAccountNumber(): string {
    return this.toAccountNumber;
  }
}
