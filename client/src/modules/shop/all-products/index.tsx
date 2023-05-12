import styled from '@emotion/styled';
import React, { useLayoutEffect } from 'react';
import SideToolbar from './product-filter';
import ProductResults from './product-results';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetAllFilter } from '~/store/clothes/clothesSlice';

const AllProductSectionContaniner = styled.section`
  padding: 4.4rem 16rem 6rem 16rem;
  display: flex;
  gap: 1.6rem;
`;

const AllProductSection: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(resetAllFilter());
  }, [pathname]);

  return <AllProductSectionContaniner>
    <SideToolbar />
    <ProductResults />
  </AllProductSectionContaniner>;
};

export default AllProductSection;
