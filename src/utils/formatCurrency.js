export const formatCurrency = (amount, currencyCode, currencies) => {
    const currency = currencies.find(c => c.code === currencyCode) || currencies[0];
  
    const formattedAmount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  
    return `${currency.symbol}${formattedAmount}`;
  };
  