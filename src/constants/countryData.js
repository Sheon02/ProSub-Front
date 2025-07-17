
export const COUNTRY_DATA = {
  IN: { 
    currency: '₹', 
    currencyName: 'INR', 
    conversionRate: 1, // Base currency (Indian Rupee)
    country: 'India'
  },
  US: { 
    currency: '$', 
    currencyName: 'USD', 
    conversionRate: 0.012,
    country: 'United States'
  },
  UK: { 
    currency: '£', 
    currencyName: 'GBP', 
    conversionRate: 0.0095,
    country: 'United Kingdom'
  },
  EU: { 
    currency: '€', 
    currencyName: 'EUR', 
    conversionRate: 0.011,
    country: 'European Union'
  },
  AE: {
    currency: 'AED', 
    currencyName: 'Dirham',
    conversionRate: 0.044,
    country: 'United Arab Emirates'
  },
  SG: {
    currency: 'S$',
    currencyName: 'SGD',
    conversionRate: 0.016,
    country: 'Singapore'
  },
  JP: {
    currency: '¥',
    currencyName: 'JPY',
    conversionRate: 1.77,
    country: 'Japan'
  },
  AU: {
    currency: 'A$',
    currencyName: 'AUD',
    conversionRate: 0.018,
    country: 'Australia'
  },
  CA: {
    currency: 'C$',
    currencyName: 'CAD',
    conversionRate: 0.016,
    country: 'Canada'
  },
  // Add more countries as needed
  BR: {
    currency: 'R$',
    currencyName: 'BRL',
    conversionRate: 0.061,
    country: 'Brazil'
  },
  ZA: {
    currency: 'R',
    currencyName: 'ZAR',
    conversionRate: 0.22,
    country: 'South Africa'
  }
};

// Default country (India)
export const DEFAULT_COUNTRY = 'IN';