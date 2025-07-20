
import { COUNTRY_DATA } from '../constants/countryData';

export const formatPrice = (basePrice, currency, conversionRate) => {
  const convertedPrice = basePrice * conversionRate;
  
  // Special formatting for Japanese Yen (no decimal places)
  if (currency === '¥') {
    return `${currency} ${Math.round(convertedPrice)}`;
  }
  
  return `${currency} ${convertedPrice.toFixed(2)}`;
};

export const getCountryCurrencyData = (countryCode) => {
  // Return undefined if country not found - let caller handle fallback
  return COUNTRY_DATA?.[countryCode];
};

export const convertPrice = (price, fromCurrency, toCurrency) => {
  const fromData = Object.values(COUNTRY_DATA || {}).find(c => c?.currency === fromCurrency);
  const toData = Object.values(COUNTRY_DATA || {}).find(c => c?.currency === toCurrency);  
  if (!fromData || !toData) return price;
  
  return (price / fromData.conversionRate) * toData.conversionRate;
};