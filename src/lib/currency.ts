import { getFinancials } from './data';

export interface ConvertedPrice {
  currency: string;
  symbol: string;
  amount: number;
  formatted: string;
}

const currencySymbols: Record<string, string> = {
  ZAR: 'R',
  GBP: '£',
  EUR: '€',
  USD: '$',
  CHF: 'CHF ',
  AED: 'AED '
};

export function convertPrice(zarAmount: number): ConvertedPrice[] {
  const financials = getFinancials();
  
  const converted: ConvertedPrice[] = [
    {
      currency: 'ZAR',
      symbol: 'R',
      amount: zarAmount,
      formatted: `R ${zarAmount.toLocaleString()}`
    }
  ];
  
  financials.exchangeRates.forEach(rate => {
    const amount = Math.round(zarAmount * rate.rate);
    const symbol = currencySymbols[rate.currency] || rate.currency + ' ';
    converted.push({
      currency: rate.currency,
      symbol,
      amount,
      formatted: `${symbol}${amount.toLocaleString()}`
    });
  });
  
  return converted;
}

export function formatZAR(amount: number): string {
  return `R ${amount.toLocaleString()}`;
}

export function getNetProceeds(): { gross: number; costs: number; net: number } {
  const financials = getFinancials();
  const costs = financials.costs.reduce((sum, c) => sum + c.amount, 0);
  
  return {
    gross: financials.askingPrice,
    costs,
    net: financials.askingPrice - costs
  };
}
