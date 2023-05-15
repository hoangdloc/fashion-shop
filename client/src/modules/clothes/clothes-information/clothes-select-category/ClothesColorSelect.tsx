import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';

import { MyRadioGroup } from '~/shared/components/radio-group';
import { renderColorBox } from '~/shared/utils/renderColorBox';

import type { Color } from '~/shared/@types/category';
import type { RadioItems } from '~/shared/components/radio-group';
import { useClothesDetails } from '~/contexts/clothes-details-context';

interface ClothesColorSelectProps {
  colors: Color[]
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

const ColorBox = styled.div<{ boxColor: string }>`
  width: 2.8rem;
  height: 2.8rem;
  background-color: ${props => props.boxColor};
  border: 0.1rem solid rgba(0, 0, 0, 0.1);
`;

const ClothesColorSelect: React.FC<ClothesColorSelectProps> = ({ colors }) => {
  const emotionTheme = useTheme();
  const { setPickedColor } = useClothesDetails();
  const colorSelectItems: RadioItems[] = colors.map(color => ({
    id: color,
    value: color,
    label: <ColorBox boxColor={renderColorBox(color)} />
  }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPickedColor(e.target.value as Color);
  };

  return (
    <Container>
      <Typography.Title level={5}>Select color</Typography.Title>
      <MyRadioGroup
        name="color-select"
        direction="horizontal"
        type="box"
        data={colorSelectItems}
        defaultCheckedRadio={colors[0]}
        selectedStyle={{
          border: `0.2rem solid ${emotionTheme.colors.secondaryRed}`
        }}
        hoverStyle={{ opacity: 0.6 }}
        onChange={onChange}
      />
    </Container>
  );
};

export default ClothesColorSelect;
