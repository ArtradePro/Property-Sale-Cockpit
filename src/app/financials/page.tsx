import { Shell } from '@/components/layout/Shell';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { getFinancials, getProperty } from '@/lib/data';
import { formatZAR, convertPrice, getNetProceeds } from '@/lib/currency';
import { fetchExchangeRates } from '@/lib/exchange';
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export default function FinancialsPage() {
  const financials = getFinancials();
  const property = getProperty();
  const [exchangeRates, setExchangeRates] = useState(financials.exchangeRates);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchExchangeRates()
      .then(rates => setExchangeRates(rates))
      .catch(() => setExchangeRates(financials.exchangeRates))
      .finally(() => setLoading(false));
  }, []);

  function convertPriceLive(zarAmount: number) {
    const currencySymbols: Record<string, string> = {
      ZAR: 'R', GBP: '£', EUR: '€', USD: '$', CHF: 'CHF ', AED: 'AED '
    };
    const converted = [
      {
        currency: 'ZAR', symbol: 'R', amount: zarAmount, formatted: `R ${zarAmount.toLocaleString()}`
      }
    ];
    exchangeRates.forEach(rate => {
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

  const prices = convertPriceLive(property.askingPrice);
  const { gross, costs, net } = getNetProceeds();
  const netPrices = convertPriceLive(net);

  return (
    <Shell
      title="Financials"
      description="Track costs, conversions, and net proceeds"
    >
      {/* Price Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <CardTitle>Asking Price</CardTitle>
          </div>
          <div className="text-3xl font-bold text-gray-900">{formatZAR(gross)}</div>
        </Card>
        
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <CardTitle>Estimated Costs</CardTitle>
          </div>
          <div className="text-3xl font-bold text-gray-900">{formatZAR(costs)}</div>
        </Card>
        
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <CardTitle>Net Proceeds</CardTitle>
          </div>
          <div className="text-3xl font-bold text-gray-900">{formatZAR(net)}</div>
        </Card>
      </div>
      
      {/* Currency Conversions */}
      <Card className="mb-8">
        <CardTitle>International Pricing</CardTitle>
        <CardDescription>
          {loading ? 'Loading live exchange rates...' : 'Approximate values at current exchange rates'}
        </CardDescription>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-3">Asking Price</h4>
            <div className="space-y-2">
              {prices.map(p => (
                <div key={p.currency} className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-700">{p.currency}</span>
                  <span className="font-semibold text-gray-900">{p.formatted}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-3">Net Proceeds</h4>
            <div className="space-y-2">
              {netPrices.map(p => (
                <div key={p.currency} className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-700">{p.currency}</span>
                  <span className="font-semibold text-gray-900">{p.formatted}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-xs text-gray-400 mt-4">
          Rates last updated: {exchangeRates[0]?.updatedAt || financials.exchangeRates[0]?.updatedAt}. 
          Powered by exchangerate.host
        </p>
      </Card>
      
      {/* Cost Breakdown */}
      <Card>
        <CardTitle>Cost Breakdown</CardTitle>
        <CardDescription>Expected selling costs (edit in data/financials.json)</CardDescription>
        
        <div className="mt-4">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3">Item</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {financials.costs.map(cost => (
                <tr key={cost.id}>
                  <td className="py-3 font-medium text-gray-900">{cost.item}</td>
                  <td className="py-3 text-gray-700">{formatZAR(cost.amount)}</td>
                  <td className="py-3"><StatusBadge status={cost.status} /></td>
                  <td className="py-3 text-sm text-gray-500">{cost.notes}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2">
                <td className="py-3 font-bold text-gray-900">Total</td>
                <td className="py-3 font-bold text-gray-900">{formatZAR(costs)}</td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </Shell>
  );
}
