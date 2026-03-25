export class InsufficientFundsException extends Error {
  constructor(message: string = 'Insufficient funds') {
    super(message);
    this.name = 'InsufficientFundsException';
  }
}