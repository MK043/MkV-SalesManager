// Multi-Currency Engine for MKV Autostand (EUR, USD, UAH)

export const CURRENCIES = {
  UAH: { code: 'UAH', symbol: '₴', label: 'Гривня (UAH)', rateToUah: 1.0 },
  USD: { code: 'USD', symbol: '$', label: 'Долар (USD)', rateToUah: 41.5 },
  EUR: { code: 'EUR', symbol: '€', label: 'Євро (EUR)', rateToUah: 45.2 }
};

let currentCurrency = localStorage.getItem('mkv-currency') || 'UAH';

export function getSelectedCurrency() {
  return currentCurrency;
}

export function setSelectedCurrency(curr) {
  if (CURRENCIES[curr]) {
    currentCurrency = curr;
    localStorage.setItem('mkv-currency', curr);
    window.dispatchEvent(new CustomEvent('mkv-currency-change', { detail: curr }));
  }
}

/**
 * Format numeric value in active currency
 * @param {number} amountInUah Amount in base UAH
 * @param {string} [currencyCode] Optional override currency
 * @param {boolean} [convert=true] Whether to convert using exchange rate
 */
export function formatMoney(amountInUah, currencyCode = null, convert = true) {
  if (amountInUah === null || amountInUah === undefined || isNaN(amountInUah)) {
    return '0 ₴';
  }

  const targetCode = currencyCode || currentCurrency;
  const curr = CURRENCIES[targetCode] || CURRENCIES.UAH;
  
  let val = Number(amountInUah);
  if (convert && targetCode !== 'UAH' && curr.rateToUah > 0) {
    val = val / curr.rateToUah;
  }

  // Format with space as thousand separator
  const formatted = new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: val % 1 === 0 ? 0 : 2
  }).format(val);

  if (targetCode === 'USD' || targetCode === 'EUR') {
    return `${curr.symbol}${formatted}`;
  }
  return `${formatted} ${curr.symbol}`;
}
