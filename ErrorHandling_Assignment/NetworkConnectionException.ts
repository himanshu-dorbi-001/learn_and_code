export class NetworkConnectionException extends Error {
  constructor(message: string = 'Network connection error') {
    super(message);
    this.name = 'NetworkConnectionException';
  }
}