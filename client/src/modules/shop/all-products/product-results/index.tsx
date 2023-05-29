import { ControlOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Drawer, Typography } from 'antd';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import { MyButton } from '~/shared/components/button';
import { useMedia } from '~/shared/hooks/useMedia';
import ProductGrid from './ProductGrid';
import SearchBar from './SearchBar';
import SortingSelect from './SortingSelect';

import { type RootState } from '~/store/store';
import FiltersDrawer from '../product-filter/FiltersDrawer';

const ProductResultsContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3rem;
  width: 100%;
  @media ${props => props.theme.devices.mobile} {
    gap: 2.4rem;
  }
`;

const TopToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  @media ${props => props.theme.devices.mobile} {
    gap: 0;
    width: 100%;
    justify-content: space-between;
    & > .result-text {
      font-size: 1.4rem;
      color: ${props => props.theme.colors.grayDarker};
    }
  }
`;

const ProductResults: React.FC = () => {
  const media = useMedia<boolean>(
    ['(min-width: 37.5em)', '(min-width: 0)'],
    [true, false],
    true
  );
  const results = useSelector((state: RootState) => state.clothes.results);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const showDrawer = (): void => {
    setOpenDrawer(true);
  };

  const onClose = (): void => {
    setOpenDrawer(false);
  };

  return (
    <Fragment>
      <ProductResultsContainer>
        <TopToolbar>
          {media && (
            <Fragment>
              <SearchBar />
              <SortingSelect />
            </Fragment>
          )}
          {!media && (
            <Fragment>
              <Typography.Text className="result-text">{`${
                results ?? 0
              } results`}</Typography.Text>
              <MyButton
                shape="round"
                icon={<ControlOutlined />}
                onClick={showDrawer}
              >
                Filters
              </MyButton>
            </Fragment>
          )}
        </TopToolbar>
        <ProductGrid />
      </ProductResultsContainer>
      {!media && (
        <Drawer
          open={openDrawer}
          placement="bottom"
          onClose={onClose}
          title="Filters"
          height="80vh"
        >
          <FiltersDrawer />
        </Drawer>
      )}
    </Fragment>
  );
};

export default ProductResults;
