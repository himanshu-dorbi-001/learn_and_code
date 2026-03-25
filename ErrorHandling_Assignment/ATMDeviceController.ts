import { DeviceLockedException } from './DeviceLockedException';
import { InsufficientFundsException } from './InsufficientFundsException';
import { NetworkConnectionException } from './NetworkConnectionException';

const DEVICE_SUSPENDED = -1;
const WIFI_CONNECTED = 1;
const DEV1 = 'DEV1';

class DeviceHandle {
  static INVALID = new DeviceHandle('');
  id: string;
  isValid: boolean;

  constructor(id: string) {
    this.id = id;
    this.isValid = id !== '';
  }
}

class DeviceRecord {
  status: number;
  wifiConnection: number;

  constructor(status: number, wifiConnection: number) {
    this.status = status;
    this.wifiConnection = wifiConnection;
  }
}

export class ATMDeviceController {
  private getHandle(deviceId: string): DeviceHandle {
    return new DeviceHandle(deviceId);
  }

  private retrieveDeviceRecord(handle: DeviceHandle): DeviceRecord {
    return new DeviceRecord(0, WIFI_CONNECTED);
  }

  private getBalance(accountId: string): number {
    return 1000;
  }

  private dispenseCash(handle: DeviceHandle, amount: number): void {
    console.log(`Dispensing ${amount}`);
  }

  withdraw(accountId: string, amount: number): void {
    const handle = this.getHandle(DEV1);
    if (!handle.isValid) {
      throw new Error('Invalid device handle');
    }

    const record = this.retrieveDeviceRecord(handle);
    if (record.status === DEVICE_SUSPENDED) {
      throw new DeviceLockedException();
    }

    if (record.wifiConnection !== WIFI_CONNECTED) {
      throw new NetworkConnectionException();
    }

    const balance = this.getBalance(accountId);
    if (balance < amount) {
      throw new InsufficientFundsException();
    }

    this.dispenseCash(handle, amount);
  }
}