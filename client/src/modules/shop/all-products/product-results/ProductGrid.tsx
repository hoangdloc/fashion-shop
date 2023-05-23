import styled from '@emotion/styled';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

import { ShopPathname } from '~/config/route';
import { NextBtnIcon, PrevBtnIcon } from '~/shared/components/icon';
import { ListCards } from '~/shared/components/list-cards';
import { calcActualPrice } from '~/shared/utils/renderPrice';
import { useFetchClothingQuery } from '~/store/clothes/clothesService';

import { shopUrlParams } from '~/shared/@types/ShopURLParams';
import { Color, Gender, Type } from '~/shared/@types/category';
import type { Clothes } from '~/shared/@types/clothes';
import { Size } from '~/shared/@types/size';
import { Sorting } from '~/shared/@types/sorting';
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
    & .disabled-btn,
    .disabled-btn:hover {
      cursor: not-allowed;
      background-color: ${props => props.theme.colors.footerBg};
      color: ${props => props.theme.colors.horizontalColor};
      border: 0.1rem solid ${props => props.theme.colors.horizontalColor};
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
  const [searchParams, setSearchParams] = useSearchParams();

  // EXTRACT SEARCH PARAMS
  const colorParam = searchParams.get(shopUrlParams.COLOR) as Color;
  const typeParam = searchParams.get(shopUrlParams.TYPE) as Type;
  const sizeParam = searchParams.get(shopUrlParams.SIZE) as Size;
  const keywordParam = searchParams.get(shopUrlParams.KEYWORD);
  const sortByPriceParam = searchParams.get(
    shopUrlParams.SORT_BY_PRICE
  ) as Sorting;
  const pageParam = Number(searchParams.get(shopUrlParams.PAGE));
  const minPriceParam = Number(searchParams.get(shopUrlParams.MIN_PRICE));
  const maxPriceParam = Number(searchParams.get(shopUrlParams.MAX_PRICE));

  const { isFetching } = useFetchClothingQuery();
  const { pathname } = useLocation();
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<Clothes[] | undefined>(
    undefined
  );
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [forcePage, setForcePage] = useState<number>(pageParam);
  const clothings = useSelector((state: RootState) => state.clothes.clothings);

  const sortedClothings = useMemo(() => {
    if (clothings != null) {
      switch (sortByPriceParam) {
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
  }, [clothings, sortByPriceParam]);

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
      .filter(cloth => cloth.category[1] === (typeParam ?? Type.CLOTHING))
      .filter(cloth => {
        return (
          calcActualPrice(cloth.price, cloth.salePercent) >= minPriceParam &&
          calcActualPrice(cloth.price, cloth.salePercent) <=
            (searchParams.has(shopUrlParams.MAX_PRICE) ? maxPriceParam : 500)
        );
      })
      .filter(cloth =>
        cloth.category.slice(2).includes(colorParam ?? Color.WHITE)
      )
      .filter(cloth => cloth.sizes.includes(sizeParam ?? Size.S))
      .filter(cloth =>
        cloth.name
          .toLowerCase()
          .includes((keywordParam ?? '').trim().toLowerCase())
      );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams, sortedClothings]);

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
      searchParams.delete(shopUrlParams.PAGE);
      setSearchParams(searchParams);
    }
  }, [
    pageCount,
    colorParam,
    sizeParam,
    keywordParam,
    typeParam,
    minPriceParam,
    maxPriceParam
  ]);

  // HANDLE SYNCHRONISE BETWEEN PAGE PARAMS AND FORCE PAGE
  useLayoutEffect(() => {
    if (pageParam <= pageCount - 1) {
      setForcePage(pageParam);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount, searchParams]);

  // HANDLE PAGINATION CHANGE
  useLayoutEffect(() => {
    if (filteredClothings != null) {
      const newOffset = (forcePage * ITEM_PER_PAGE) % filteredClothings.length;
      setItemOffset(newOffset);
    }
  }, [filteredClothings, forcePage]);

  const onPageClick = (clickEvent: {
    selected: number
    nextSelectedPage?: number
  }): void => {
    if (clickEvent.nextSelectedPage == null) {
      setForcePage(clickEvent.selected);
      searchParams.set(shopUrlParams.PAGE, clickEvent.selected.toString());
      setSearchParams(searchParams);
      return;
    }
    setForcePage(clickEvent.nextSelectedPage);
    searchParams.set(
      shopUrlParams.PAGE,
      clickEvent.nextSelectedPage.toString()
    );
    setSearchParams(searchParams);
  };

  return (
    <ProductGridContainer>
      <ListCards
        loading={isFetching}
        columnCount={3}
        data={currentItems}
      />
      {currentItems != null && pageCount > 1 && (
        <ReactPaginate
          breakLabel="..."
          pageCount={pageCount}
          forcePage={forcePage}
          pageRangeDisplayed={2}
          nextLabel={<NextBtnIcon />}
          previousLabel={<PrevBtnIcon />}
          renderOnZeroPageCount={null}
          className="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="prev-btn"
          nextLinkClassName="next-btn"
          disabledLinkClassName="disabled-btn"
          activeLinkClassName="page-active"
          onClick={onPageClick}
        />
      )}
    </ProductGridContainer>
  );
};

export default ProductGrid;
