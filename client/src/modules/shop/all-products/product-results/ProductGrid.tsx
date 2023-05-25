/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocation, useSearchParams } from 'react-router-dom';

import { ShopPathname } from '~/config/route';
import { NextBtnIcon, PrevBtnIcon } from '~/shared/components/icon';
import { ListCards } from '~/shared/components/list-cards';
import { clothesApi } from '~/store/clothes/clothesService';

import { shopUrlParams } from '~/shared/@types/ShopURLParams';
import { Color, Gender, Type } from '~/shared/@types/category';
import { Size } from '~/shared/@types/size';
import { Sorting } from '~/shared/@types/sorting';

const ITEM_PER_PAGE = 9;

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
  const colorParam = searchParams.get(shopUrlParams.COLOR) ?? Color.WHITE;
  const typeParam = searchParams.get(shopUrlParams.TYPE) ?? Type.CLOTHING;
  const sizeParam = searchParams.get(shopUrlParams.SIZE) ?? Size.S;
  const keywordParam = searchParams.get(shopUrlParams.KEYWORD) ?? '';
  const sortByPriceParam =
    searchParams.get(shopUrlParams.SORT_BY_PRICE) ?? Sorting.DEFAULT;
  const pageParam = Number(searchParams.get(shopUrlParams.PAGE));
  const minPriceParam = Number(searchParams.get(shopUrlParams.MIN_PRICE));
  const maxPriceParam = Number(
    searchParams.get(shopUrlParams.MAX_PRICE) ?? 500
  );

  const [trigger, { data, isFetching }] = clothesApi.useLazyFetchClothingQuery();
  const { pathname } = useLocation();
  const [pageCount, setPageCount] = useState<number>(0);
  const [forcePage, setForcePage] = useState<number>(pageParam);
  const clothings = data?.data.clothings;

  const genderParam = useMemo(() => {
    switch (pathname) {
      case ShopPathname.WOMEN:
        return Gender.WOMEN;
      case ShopPathname.UNISEX:
        return Gender.UNISEX;
      default:
        return Gender.MEN;
    }
  }, [pathname]);

  // INITIAL REACT-PAGINATE
  useLayoutEffect(() => {
    if (data == null) return;
    setPageCount(Math.ceil(data.results / ITEM_PER_PAGE));
  }, [data]);

  // HANDLE SYNCHRONISE BETWEEN PAGE PARAMS AND FORCE PAGE
  useLayoutEffect(() => {
    if (pageParam <= pageCount - 1) {
      setForcePage(pageParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount, searchParams]);

  // FETCH DATA
  useEffect(() => {
    const fetchData = trigger({
      color: colorParam as Color,
      size: sizeParam as Size,
      type: typeParam as Type,
      minPrice: minPriceParam,
      maxPrice: maxPriceParam,
      page: pageParam,
      limit: ITEM_PER_PAGE,
      gender: genderParam,
      keyword: keywordParam,
      sortByPrice: sortByPriceParam as Sorting
    });

    window.scrollTo({ top: 525, behavior: 'smooth' });

    return () => {
      fetchData.unsubscribe();
    };
  }, [
    pathname,
    colorParam,
    sizeParam,
    keywordParam,
    typeParam,
    minPriceParam,
    maxPriceParam,
    pageParam,
    sortByPriceParam
  ]);

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
        loadingRows={3}
        columnCount={3}
        data={clothings}
      />
      {clothings != null && pageCount > 1 && (
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
