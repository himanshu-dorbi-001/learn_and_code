import { Customer } from "../models/Customer";
import { EntityAlreadyExistsError } from "../errors/EntityAlreadyExistsError";
import { EntityNotFoundError } from "../errors/EntityNotFoundError";

export class CustomerService {
  private readonly customers: Map<string, Customer> = new Map();

  createCustomer(customerId: string, customerName: string): Customer {
    if (this.customers.has(customerId)) {
      throw new EntityAlreadyExistsError('Customer', customerId);
    }
    const newCustomer = new Customer(customerId, customerName);
    this.customers.set(customerId, newCustomer);
    return newCustomer;
  }

  getCustomer(customerId: string): Customer {
    const customer = this.customers.get(customerId);
    if (!customer) throw new EntityNotFoundError('Customer', customerId);
    return customer;
  }

  getAllCustomers(): Customer[] {
    return Array.from(this.customers.values());
  }
}
