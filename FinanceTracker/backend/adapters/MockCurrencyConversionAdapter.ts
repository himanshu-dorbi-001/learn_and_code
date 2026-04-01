import { ICurrencyConversionService } from '../domain/services/ICurrencyConversionService';
import { ExternalServiceError } from '../domain/errors/ApplicationError';

export class MockCurrencyConversionAdapter implements ICurrencyConversionService {
  // Mock exchange rates
  private readonly exchangeRates: Record<string, Record<string, number>> = {
    USD: { USD: 1.0, EUR: 0.92, GBP: 0.79, INR: 83.10 },
    EUR: { USD: 1.09, EUR: 1.0, GBP: 0.86, INR: 90.50 },
    GBP: { USD: 1.27, EUR: 1.17, GBP: 1.0, INR: 105.20 },
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095, INR: 1.0 }
  };

  async convert(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
    const rate = await this.getExchangeRate(fromCurrency, toCurrency);
    return amount * rate;
  }

  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
    const upperFrom = fromCurrency.toUpperCase();
    const upperTo = toCurrency.toUpperCase();

    if (!this.exchangeRates[upperFrom] || this.exchangeRates[upperFrom][upperTo] === undefined) {
      throw new ExternalServiceError('Currency Conversion', `Unsupported currency conversion: ${fromCurrency} to ${toCurrency}`);
    }

    return this.exchangeRates[upperFrom][upperTo];
  }
}