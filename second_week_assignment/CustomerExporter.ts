import { Customer } from "./CustomerSearchService";

export class CustomerExporter {
  public exportToCsv(customers: Customer[]): string {
    return customers
      .map(
        (c) => `${c.customerID},${c.companyName},${c.contactName},${c.country}`
      )
      .join("\n");
  }
}
