import  { useMemo } from 'react'

const useCurrencyConverter = (currency, value, locale = "es-ES") => {

    const formatter = useMemo(() => new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
      }), [locale, currency]);
    
      return formatter.format(value);
  
}

export default useCurrencyConverter
