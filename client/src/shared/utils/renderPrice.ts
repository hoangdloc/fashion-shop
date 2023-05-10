import { Status } from '~/shared/@types/status';

interface RenderPrice {
  originalPrice: string
  actualPrice: string
  isSale: boolean
}

export function calcActualPrice (price: number, salePercent: number): number {
  return price - price * (salePercent / 100);
}

export function localePrice (fixedPrice: string): string {
  return fixedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function renderPrice (
  price: number,
  salePercent: number,
  status: Status
): RenderPrice {
  const isSale = salePercent !== 0 || status === Status.SALE;
  const originalPrice = localePrice(price.toFixed(2));
  const actualPrice = localePrice(
    calcActualPrice(price, salePercent).toFixed(2)
  );

  return {
    originalPrice,
    actualPrice,
    isSale
  };
}
