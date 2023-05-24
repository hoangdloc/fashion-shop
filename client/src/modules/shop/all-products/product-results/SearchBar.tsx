import { useTheme } from '@emotion/react';
import { ConfigProvider, Input } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { shopUrlParams } from '~/shared/@types/ShopURLParams';

const SearchBar: React.FC = () => {
  const emotionTheme = useTheme();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [words, setWords] = useState<string>(
    searchParams.get(shopUrlParams.KEYWORD) ?? ''
  );

  useLayoutEffect(() => {
    setWords(searchParams.get(shopUrlParams.KEYWORD) ?? '');
  }, [pathname, searchParams]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWords(e.target.value);
  };

  const onSearch = (value: string): void => {
    if (value === '') {
      searchParams.delete(shopUrlParams.KEYWORD);
      setSearchParams(searchParams);
      return;
    }
    searchParams.set(shopUrlParams.KEYWORD, value);
    searchParams.delete(shopUrlParams.PAGE);
    setSearchParams(searchParams);
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
