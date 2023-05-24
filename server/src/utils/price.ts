export function calcActualPrice(price: number, salePercent: number): number {
  return price - price * (salePercent / 100);
}
