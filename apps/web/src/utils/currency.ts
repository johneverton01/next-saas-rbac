export function formatCurrency() {
  const formatterToUSD = (value: number): string => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }
  return {
    formatterToUSD,
  }
}
