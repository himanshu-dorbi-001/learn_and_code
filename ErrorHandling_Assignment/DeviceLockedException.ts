export class DeviceLockedException extends Error {
  constructor(message: string = 'Device is locked') {
    super(message);
    this.name = 'DeviceLockedException';
  }
}