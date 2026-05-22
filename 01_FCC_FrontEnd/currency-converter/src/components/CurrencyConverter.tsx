'use client';

import React, { useState, useMemo } from 'react';

const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrency] = useState<string>('USD');

  // Ottimizzazione delle prestazioni tramite memoizzazione (Richiesta dai Test 5 e 6)
  const convertedAmounts = useMemo(() => {
    const baseAmount = amount / exchangeRates[fromCurrency];
    return {
      USD: baseAmount * exchangeRates.USD,
      EUR: baseAmount * exchangeRates.EUR,
      GBP: baseAmount * exchangeRates.GBP,
      JPY: baseAmount * exchangeRates.JPY,
    };
  }, [amount, fromCurrency]);

  const finalAmount = convertedAmounts[toCurrency];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 text-slate-100">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Currency Converter</h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-semibold tracking-wider text-slate-400 mb-2 uppercase">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold tracking-wider text-slate-400 mb-2 uppercase">
              From
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
            >
              {Object.keys(exchangeRates).map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider text-slate-400 mb-2 uppercase">
              To
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
            >
              {Object.keys(exchangeRates).map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700">
          <p className="text-xs font-semibold tracking-wider text-slate-400 mb-2 uppercase">
            Converted Amount
          </p>
          <p className="text-4xl font-mono font-bold text-emerald-400 tracking-tight">
            {finalAmount.toFixed(2)} <span className="text-2xl text-emerald-600">{toCurrency}</span>
          </p>
        </div>
      </div>
    </div>
  );
}