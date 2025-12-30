// Fetch live exchange rates from exchangerate.host
export async function fetchExchangeRates(base = 'ZAR', symbols = ['USD', 'GBP', 'EUR', 'CHF', 'AED']) {
  const url = `https://api.exchangerate.host/latest?base=${base}&symbols=${symbols.join(',')}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch exchange rates');
  const data = await res.json();
  // Format for app
  return symbols.map(symbol => ({
    currency: symbol,
    rate: data.rates[symbol],
    updatedAt: new Date().toISOString()
  }));
}
