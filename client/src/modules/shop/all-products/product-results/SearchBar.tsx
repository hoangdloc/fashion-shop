import { useTheme } from '@emotion/react';
import { ConfigProvider, Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';

import { searchingClothes } from '~/store/clothes/clothesSlice';

const SearchBar: React.FC = () => {
  const emotionTheme = useTheme();
  const dispatch = useDispatch();

  const onSearch = (value: string): void => {
    dispatch(searchingClothes(value));
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: emotionTheme.colors.secondaryRed
        }
      }}
    >
      <Input.Search
        size="large"
        placeholder="Enter product name"
        allowClear
        style={{ width: 304 }}
        onSearch={onSearch}
      />
    </ConfigProvider>
  );
};

export default SearchBar;
