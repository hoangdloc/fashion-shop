import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Sorting } from '../../../../shared/@types/sorting';
import { ListCards } from '../../../../shared/components/list-cards';
import { calcActualPrice } from '../../../../shared/utils/calcActualPrice';
import { useFetchClothingQuery } from '../../../../store/clothes/clothesService';
import type { RootState } from '../../../../store/store';

const ProductGrid: React.FC = () => {
  const { data, isFetching } = useFetchClothingQuery();
  const sorting = useSelector((state: RootState) => state.clothes.sorting);

  const sortedData = useMemo(() => {
    switch (sorting) {
      case Sorting.LOW_TO_HIGH:
        if (data != null) {
          return [...data].sort((a, b) => {
            return (
              calcActualPrice(a.price, a.salePercent) -
              calcActualPrice(b.price, b.salePercent)
            );
          });
        }
        break;

      case Sorting.HIGH_TO_LOW:
        if (data != null) {
          return [...data].sort((a, b) => {
            return (
              calcActualPrice(b.price, b.salePercent) -
              calcActualPrice(a.price, a.salePercent)
            );
          });
        }
        break;

      default:
        if (data != null) return data;
        break;
    }
  }, [sorting, data]);

  return (
    <ListCards
      loading={isFetching}
      columnCount={3}
      data={sortedData}
    />
  );
};

export default ProductGrid;
