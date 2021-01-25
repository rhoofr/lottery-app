exports.formatCurrency = value => {
  if (isNaN(value)) return;
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};
