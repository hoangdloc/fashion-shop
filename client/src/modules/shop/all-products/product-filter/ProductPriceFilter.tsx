import styled from '@emotion/styled';
import React, { useState } from 'react';
import { DecoratedHeading } from '../../../../shared/components/heading';
import { InputNumber, Slider } from 'antd';
import { MyButton } from '../../../../shared/components/button';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterByPrice } from '../../../../store/clothes/clothesSlice';
import type { RootState } from '../../../../store/store';

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
`;

const PriceFilterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const DualInputRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  & > .price-input {
    width: 6rem;
  }
`;

const DashSign = styled.div`
  width: 0.8rem;
  height: 0.15rem;
  background-color: ${props => props.theme.colors.primaryBlack};
`;

const ProductPriceFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filterByPrice = useSelector(
    (state: RootState) => state.clothes.filterByPrice
  );
  const [priceFrom, setPriceFrom] = useState<number>(filterByPrice.from);
  const [priceTo, setPriceTo] = useState<number>(filterByPrice.to);

  const onPriceSliderChange = (value: [number, number]): void => {
    setPriceFrom(value[0]);
    setPriceTo(value[1]);
  };

  const onPriceFromInputChange = (newValue: number | null): void => {
    setPriceFrom(newValue ?? 0);
  };

  const onPriceToInputChange = (newValue: number | null): void => {
    setPriceTo(newValue ?? 0);
  };

  const onButtonClick = (): void => {
    dispatch(setFilterByPrice({ from: priceFrom, to: priceTo }));
  };

  return (
    <ProductPriceFilterContainer>
      <DecoratedHeading>Filter by price</DecoratedHeading>
      <Slider
        range
        max={ProductPrice.MAX}
        min={ProductPrice.MIN}
        defaultValue={[priceFrom, priceTo]}
        trackStyle={[{ backgroundColor: '#EAEAEA' }]}
        railStyle={{ backgroundColor: '#CECECE' }}
        onChange={onPriceSliderChange}
        value={[priceFrom, priceTo]}
      />
      <PriceFilterBox>
        <DualInputRangeContainer>
          <InputNumber
            prefix="$"
            className="price-input"
            max={ProductPrice.MAX}
            min={ProductPrice.MIN}
            value={priceFrom}
            onChange={onPriceFromInputChange}
          />
          <DashSign />
          <InputNumber
            prefix="$"
            className="price-input"
            max={ProductPrice.MAX}
            min={ProductPrice.MIN}
            value={priceTo}
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
