export interface Customer {
  customerID: string;
  companyName: string;
  contactName: string;
  country: string;
}

export class CustomerSearchService {
  private readonly customers: Customer[];

  constructor(customers: Customer[]) {
    this.customers = customers;
  }

  public searchByCountry(country: string): Customer[] {
    return this.customers
      .filter((c) => c.country.includes(country))
      .sort((a, b) => a.customerID.localeCompare(b.customerID));
  }

  public searchByCompanyName(companyName: string): Customer[] {
    return this.customers
      .filter((c) => c.companyName.includes(companyName))
      .sort((a, b) => a.customerID.localeCompare(b.customerID));
  }

  public searchByContact(contactName: string): Customer[] {
    return this.customers
      .filter((c) => c.contactName.includes(contactName))
      .sort((a, b) => a.customerID.localeCompare(b.customerID));
  }
}
