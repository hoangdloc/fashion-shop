import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ListCards } from '../../../../shared/components/list-cards';
import { useFetchClothingQuery } from '../../../../store/clothes/clothesService';
import type { RootState } from '../../../../store/store';
import { Sorting } from '../../../../shared/@types/sorting';
import { calcActualPrice } from '../../../../shared/utils/calcActualPrice';

const ProductGrid: React.FC = () => {
  const { isFetching } = useFetchClothingQuery();
  const sorting = useSelector((state: RootState) => state.clothes.sorting);
  const filterByType = useSelector(
    (state: RootState) => state.clothes.filterByType
  );
  const filterByPrice = useSelector(
    (state: RootState) => state.clothes.filterByPrice
  );
  const filterByColor = useSelector(
    (state: RootState) => state.clothes.filterByColor
  );
  const filterBySize = useSelector(
    (state: RootState) => state.clothes.filterBySize
  );
  const clothings = useSelector((state: RootState) => state.clothes.clothings);

  const sortedClothings = useMemo(() => {
    if (clothings != null) {
      switch (sorting) {
        case Sorting.LOW_TO_HIGH:
          return [...clothings].sort((a, b) => {
            return (
              calcActualPrice(a.price, a.salePercent) -
              calcActualPrice(b.price, b.salePercent)
            );
          });

        case Sorting.HIGH_TO_LOW:
          return [...clothings].sort((a, b) => {
            return (
              calcActualPrice(b.price, b.salePercent) -
              calcActualPrice(a.price, a.salePercent)
            );
          });

        default:
          return clothings;
      }
    }
    return clothings;
  }, [clothings, sorting]);

  const filteredClothings = useMemo(() => {
    return sortedClothings
      ?.filter(cloth => cloth.category[1] === filterByType)
      .filter(cloth => {
        return (
          calcActualPrice(cloth.price, cloth.salePercent) >= filterByPrice.from &&
          calcActualPrice(cloth.price, cloth.salePercent) <= filterByPrice.to
        );
      })
      .filter(cloth => cloth.category.slice(2).includes(filterByColor))
      .filter(cloth => cloth.sizes.includes(filterBySize));
  }, [filterByType, filterByPrice, filterByColor, filterBySize, sortedClothings]);

  return (
    <ListCards
      loading={isFetching}
      columnCount={3}
      data={filteredClothings}
    />
  );
};

export default ProductGrid;
