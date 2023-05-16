import { useTheme } from '@emotion/react';
import { ConfigProvider, Input } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { searchingClothes } from '~/store/clothes/clothesSlice';

import { type RootState } from '~/store/store';

const SearchBar: React.FC = () => {
  const emotionTheme = useTheme();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const searching = useSelector((state: RootState) => state.clothes.searching);
  const [words, setWords] = useState<string>(searching);

  useLayoutEffect(() => {
    setWords(searching);
  }, [searching, pathname]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWords(e.target.value);
  };

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
        value={words}
        onChange={onChange}
        onSearch={onSearch}
      />
    </ConfigProvider>
  );
};

export default SearchBar;
