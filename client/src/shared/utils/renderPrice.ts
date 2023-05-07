import { Status } from '../@types/status';

interface RenderPrice {
  originalPrice: string
  actualPrice: string
  isSale: boolean
}

export function calcActualPrice (price: number, salePercent: number): number {
  return price - price * (salePercent / 100);
}

export function renderPrice (
  price: number,
  salePercent: number,
  status: Status
): RenderPrice {
  const isSale = salePercent !== 0 || status === Status.SALE;
  const originalPrice = price.toFixed(2);
  const actualPrice = calcActualPrice(price, salePercent).toFixed(2);

  return {
    originalPrice,
    actualPrice,
    isSale
  };
}
