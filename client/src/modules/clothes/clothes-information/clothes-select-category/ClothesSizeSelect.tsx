import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';

import { useClothesDetails } from '~/contexts/clothes-details-context';
import { MyRadioGroup } from '~/shared/components/radio-group';

import { type Size } from '~/shared/@types/size';
import { type RadioItems } from '~/shared/components/radio-group';

interface ClothesSizeSelectProps {
  sizes: Size[]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  & > .ant-typography {
    margin: 0;
    font-family: ${props => props.theme.fontFamily.DmSans};
  }
`;

const SizeBox = styled.div`
  background-color: #f4f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
`;

const ClothesSizeSelect: React.FC<ClothesSizeSelectProps> = ({ sizes }) => {
  const emotionTheme = useTheme();
  const { setPickedSize } = useClothesDetails();
  const sizeSelectItems: RadioItems[] = sizes.map(size => ({
    id: size,
    value: size,
    label: <SizeBox>{size}</SizeBox>
  }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPickedSize(e.target.value as Size);
  };

  return (
    <Container>
      <Typography.Title level={5}>Select size</Typography.Title>
      <MyRadioGroup
        name="size-filter"
        direction="horizontal"
        type="box"
        data={sizeSelectItems}
        defaultCheckedRadio={sizes[0]}
        selectedStyle={{
          backgroundColor: emotionTheme.colors.secondaryRed,
          color: emotionTheme.colors.textWhite
        }}
        hoverStyle={{
          backgroundColor: emotionTheme.colors.secondaryRed,
          color: emotionTheme.colors.textWhite,
          opacity: 0.6
        }}
        onChange={onChange}
      />
    </Container>
  );
};

export default ClothesSizeSelect;
