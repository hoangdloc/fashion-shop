import styled from '@emotion/styled';
import { InputNumber, Slider } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { MyButton } from '~/shared/components/button';
import { DecoratedHeading } from '~/shared/components/heading';

import { shopUrlParams } from '~/shared/@types/ShopURLParams';

enum ProductPrice {
  MAX = 1000,
  MIN = 0
}

const ProductPriceFilterContainer = styled.div`
  width: 26.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  & > .ant-slider {
    & > .ant-slider-handle {
      &::after {
        background-color: #eaeaea;
        box-shadow: 0 0 0 0.2rem #eaeaea;
      }
    }
  }
  @media ${props => props.theme.devices.mobile} {
    width: 100%;
    gap: 1.2rem;
  }
`;

const PriceFilterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  @media ${props => props.theme.devices.mobile} {
    gap: 2.4rem;
    & > .ant-btn {
      width: 10rem;
    }
  }
`;

const DualInputRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  @media ${props => props.theme.devices.mobile} {
    gap: 1.2rem;
  }
  & > .price-input {
    width: 6rem;
    @media ${props => props.theme.devices.mobile} {
      width: 8rem;
    }
  }
`;

const DashSign = styled.div`
  width: 0.8rem;
  height: 0.15rem;
  background-color: ${props => props.theme.colors.primaryBlack};
`;

const ProductPriceFilter: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState<number>(
    Number(searchParams.get(shopUrlParams.MIN_PRICE))
  );
  const [maxPrice, setMaxPrice] = useState<number>(
    searchParams.has(shopUrlParams.MAX_PRICE)
      ? Number(searchParams.get(shopUrlParams.MAX_PRICE))
      : 500
  );

  useLayoutEffect(() => {
    setMinPrice(Number(searchParams.get(shopUrlParams.MIN_PRICE)));
    setMaxPrice(
      searchParams.has(shopUrlParams.MAX_PRICE)
        ? Number(searchParams.get(shopUrlParams.MAX_PRICE))
        : 500
    );
  }, [pathname, searchParams]);

  const onPriceSliderChange = (value: [number, number]): void => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const onPriceFromInputChange = (newValue: number | null): void => {
    setMinPrice(newValue ?? 0);
  };

  const onPriceToInputChange = (newValue: number | null): void => {
    setMaxPrice(newValue ?? 500);
  };

  const onButtonClick = (): void => {
    searchParams.set(shopUrlParams.MIN_PRICE, minPrice.toString());
    searchParams.set(shopUrlParams.MAX_PRICE, maxPrice.toString());
    searchParams.delete(shopUrlParams.PAGE);
    searchParams.delete(shopUrlParams.KEYWORD);
    setSearchParams(searchParams);
  };

  return (
    <ProductPriceFilterContainer>
      <DecoratedHeading>Filter by price</DecoratedHeading>
      <Slider
        range={{ draggableTrack: true }}
        max={ProductPrice.MAX}
        min={ProductPrice.MIN}
        trackStyle={[{ backgroundColor: '#EAEAEA' }]}
        railStyle={{ backgroundColor: '#CECECE' }}
        onChange={onPriceSliderChange}
        value={[minPrice, maxPrice]}
      />
      <PriceFilterBox>
        <DualInputRangeContainer>
          <InputNumber
            prefix="$"
            className="price-input"
            max={ProductPrice.MAX}
            min={ProductPrice.MIN}
            value={minPrice}
            onChange={onPriceFromInputChange}
          />
          <DashSign />
          <InputNumber
            prefix="$"
            className="price-input"
            max={ProductPrice.MAX}
            min={ProductPrice.MIN}
            value={maxPrice}
            onChange={onPriceToInputChange}
          />
        </DualInputRangeContainer>
        <MyButton
          type="primary"
          style={{ fontWeight: 700 }}
          onClick={onButtonClick}
        >
          Filter
        </MyButton>
      </PriceFilterBox>
    </ProductPriceFilterContainer>
  );
};

export default ProductPriceFilter;
