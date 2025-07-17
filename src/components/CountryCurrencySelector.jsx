
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../slices/locationSlice';
import { COUNTRY_DATA } from '../constants/countryData';

const CountryCurrencySelector = () => {
  const dispatch = useDispatch();
  const { countryCode } = useSelector(state => state.location);

  return (
    <div className="flex items-center">
      <select
        value={countryCode}
        onChange={(e) => dispatch(setCurrency(e.target.value))}
        className="border rounded p-2 text-sm"
      >
        {Object.entries(COUNTRY_DATA).map(([code, data]) => (
          <option key={code} value={code}>
            {data.country} ({data.currency} {data.currencyName})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryCurrencySelector;