import { Customer } from "../customer/Customer";

export class Paperboy {
  collectPayment(customer: Customer, paymentAmount: number): void {
    const paid = customer.pay(paymentAmount);
    if (!paid) {
      console.log("Customer does not have enough funds. Will return later.");
    }
  }
}
