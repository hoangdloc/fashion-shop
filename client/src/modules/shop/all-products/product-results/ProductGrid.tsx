import styled from '@emotion/styled';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { ShopPathname } from '~/config/route';
import { Gender } from '~/shared/@types/category';
import type { Clothes } from '~/shared/@types/clothes';
import { Sorting } from '~/shared/@types/sorting';
import { NextBtnIcon, PrevBtnIcon } from '~/shared/components/icon';
import { ListCards } from '~/shared/components/list-cards';
import { calcActualPrice } from '~/shared/utils/renderPrice';
import { useFetchClothingQuery } from '~/store/clothes/clothesService';
import type { RootState } from '~/store/store';

const ITEM_PER_PAGE = 3;

const ProductGridContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6.5rem;
  & > .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
    & .page-num,
    .prev-btn,
    .next-btn {
      display: inline-block;
      width: 4rem;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0.1rem solid #808284;
      color: #808284;
      transition: all 0.3s ease-in-out;
      font-size: 1.6rem;
      &:hover {
        border: 0.1rem solid ${props => props.theme.colors.secondaryRed};
        color: ${props => props.theme.colors.secondaryRed};
      }
    }
    & .page-active {
      background-color: ${props => props.theme.colors.primaryBlack};
      color: ${props => props.theme.colors.textWhite};
      border: 0.1rem solid ${props => props.theme.colors.primaryBlack};
      &:hover {
        color: ${props => props.theme.colors.textWhite};
        border: 0.1rem solid ${props => props.theme.colors.primaryBlack};
      }
    }
  }
`;

const ProductGrid: React.FC = () => {
  const { isFetching } = useFetchClothingQuery();
  const { pathname } = useLocation();
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<Clothes[] | undefined>(
    undefined
  );
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [forcePage, setForcePage] = useState<number>(0);
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
  const searching = useSelector((state: RootState) => state.clothes.searching);
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
      ?.filter(cloth => {
        switch (pathname) {
          case ShopPathname.WOMEN:
            return cloth.category[0] === Gender.WOMEN;
          case ShopPathname.UNISEX:
            return cloth.category[0] === Gender.UNISEX;
          default:
            return cloth.category[0] === Gender.MEN;
        }
      })
      .filter(cloth => cloth.category[1] === filterByType)
      .filter(cloth => {
        return (
          calcActualPrice(cloth.price, cloth.salePercent) >=
            filterByPrice.from &&
          calcActualPrice(cloth.price, cloth.salePercent) <= filterByPrice.to
        );
      })
      .filter(cloth => cloth.category.slice(2).includes(filterByColor))
      .filter(cloth => cloth.sizes.includes(filterBySize))
      .filter(cloth =>
        cloth.name.toLowerCase().includes(searching.trim().toLowerCase())
      );
  }, [
    pathname,
    filterByType,
    filterByPrice,
    filterByColor,
    filterBySize,
    sortedClothings,
    searching
  ]);

  // INITIAL REACT-PAGINATE
  useLayoutEffect(() => {
    const endOffset = itemOffset + ITEM_PER_PAGE;
    if (filteredClothings == null) return;
    setCurrentItems(filteredClothings.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredClothings.length / ITEM_PER_PAGE));
  }, [filteredClothings, itemOffset]);

  // WHEN FILTER APPLY, SET CURRENT PAGE TO 0
  useLayoutEffect(() => {
    if (pageCount > 0) {
      setItemOffset(0);
      setForcePage(0);
    }
  }, [filteredClothings, pageCount]);

  const onPageChange = (selectedItem: { selected: number }): void => {
    if (filteredClothings == null) return;
    const newOffset =
      (selectedItem.selected * ITEM_PER_PAGE) % filteredClothings.length;
    setItemOffset(newOffset);
  };

  const onPageClick = (clickEvent: { selected: number, nextSelectedPage?: number }): void => {
    if (clickEvent.nextSelectedPage == null) {
      setForcePage(clickEvent.selected);
      return;
    }
    setForcePage(clickEvent.nextSelectedPage);
  };

  return (
    <ProductGridContainer>
      <ListCards
        loading={isFetching}
        columnCount={3}
        data={currentItems}
      />
      {currentItems != null && (
        <ReactPaginate
          breakLabel="..."
          pageCount={pageCount}
          forcePage={forcePage}
          pageRangeDisplayed={2}
          nextLabel={<NextBtnIcon />}
          previousLabel={<PrevBtnIcon />}
          renderOnZeroPageCount={null}
          onPageChange={onPageChange}
          className="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="prev-btn"
          nextLinkClassName="next-btn"
          activeLinkClassName="page-active"
          onClick={onPageClick}
        />
      )}
    </ProductGridContainer>
  );
};

export default ProductGrid;
