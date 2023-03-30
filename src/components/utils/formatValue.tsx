export const formatValue = (price: number) => {
  return '$' + price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
