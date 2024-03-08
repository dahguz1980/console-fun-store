import React from 'react'
import useCurrencyConverter from '../../hooks/useCurrencyConverter';

const CurrencyConverter = ({currency, value}) => {

const formattedValue = useCurrencyConverter(currency, value)

  return (
    <>
        <span>
            {formattedValue}
        </span>
    </>

  )
}

export default CurrencyConverter
