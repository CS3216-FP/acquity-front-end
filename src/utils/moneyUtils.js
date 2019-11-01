const moneyFormatter = num => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace(/\.0$/, '')}G`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return parseFloat(num).toFixed(2);
};

const toLocaleCurrency = (value, isSgdPrefixed = true) => {
  // On purpose en-US locale so it will be appended with "SGD" instead of "$"
  if (isSgdPrefixed) {
    return Number(value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'SGD'
    });
  }
  return Number(value).toLocaleString('en-SG', {
    style: 'currency',
    currency: 'SGD'
  });
};

const validateMoneyString = money => {
  if (money) {
    if (typeof money === 'number') {
      return money.toString().match(/^[0-9]+(\.[0-9]{1,2})?$/gm);
    }
    return money.match(/^[0-9]+(\.[0-9]{1,2})?$/gm);
  }
  return false;
};

export { moneyFormatter, validateMoneyString, toLocaleCurrency };
