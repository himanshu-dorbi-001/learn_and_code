import { ATMDeviceController } from './ATMDeviceController';
import { DeviceLockedException } from './DeviceLockedException';
import { InsufficientFundsException } from './InsufficientFundsException';
import { NetworkConnectionException } from './NetworkConnectionException';

const atm = new ATMDeviceController();

try {
  atm.withdraw('account1', 50);
  console.log('Withdrawal successful');
} catch (e: unknown) {
  if (e instanceof DeviceLockedException) {
    console.log('Device is locked');
  } else if (e instanceof InsufficientFundsException) {
    console.log('Insufficient funds');
  } else if (e instanceof NetworkConnectionException) {
    console.log('Network error');
  } else if (e instanceof Error) {
    console.log('Unknown error:', e.message);
  } else {
    console.log('Unknown error');
  }
}