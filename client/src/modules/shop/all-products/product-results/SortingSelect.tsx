import { DownOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ConfigProvider, Select } from 'antd';
import React, { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { Sorting } from '~/shared/@types/sorting';

import type { DefaultOptionType } from 'antd/es/select';
import { shopUrlParams } from '~/shared/@types/ShopURLParams';

const AntdSelectWrapper = styled.div`
  & .ant-select {
    & .ant-select-selector {
      & .ant-select-selection-item {
        font-size: 1.4rem;
      }
    }
  }
`;

const duration = 300;

const defaultDownOutlinedStyle = {
  transition: `transform ${duration}ms ease-in-out`,
  transform: 'rotate(0)'
};

const transitionDownOutlinedStyles = {
  entering: { transform: 'rotate(180deg)' },
  entered: { transform: 'rotate(180deg)' },
  exiting: { transform: 'rotate(0)' },
  exited: { transform: 'rotate(0)' },
  unmounted: { transform: 'rotate(0)' }
};

const selectOptions: DefaultOptionType[] = [
  { value: Sorting.DEFAULT, label: 'Default Sorting' },
  { value: Sorting.LOW_TO_HIGH, label: 'Sort by price: low to high' },
  { value: Sorting.HIGH_TO_LOW, label: 'Sort by price: high to low' }
];

const SortingSelect: React.FC = () => {
  const emotionTheme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const iconRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (value: Sorting): void => {
    searchParams.set(shopUrlParams.SORT_BY_PRICE, value);
    searchParams.delete(shopUrlParams.PAGE);
    setSearchParams(searchParams);
  };

  const onDropdownVisibleChange = (open: boolean): void => {
    setOpen(open);
  };

  return (
    <AntdSelectWrapper>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: emotionTheme.colors.secondaryRed
          }
        }}
      >
        <Select
          value={
            (searchParams.get(shopUrlParams.SORT_BY_PRICE) as Sorting) ??
            Sorting.DEFAULT
          }
          style={{ width: '17.3rem' }}
          size="large"
          suffixIcon={
            <CSSTransition
              ref={iconRef}
              in={open}
              timeout={duration}
            >
              {state => (
                <DownOutlined
                  ref={iconRef}
                  style={{
                    ...defaultDownOutlinedStyle,
                    ...transitionDownOutlinedStyles[state],
                    fontSize: '1.4rem',
                    color: emotionTheme.colors.primaryBlack
                  }}
                />
              )}
            </CSSTransition>
          }
          onChange={onChange}
          onDropdownVisibleChange={onDropdownVisibleChange}
          dropdownStyle={{ padding: 0 }}
          options={selectOptions}
        />
      </ConfigProvider>
    </AntdSelectWrapper>
  );
};

export default SortingSelect;
