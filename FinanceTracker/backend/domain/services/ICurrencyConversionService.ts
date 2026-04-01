export interface ICurrencyConversionService {
  convert(amount: number, fromCurrency: string, toCurrency: string): Promise<number>;
  getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number>;
}
