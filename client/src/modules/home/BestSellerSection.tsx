import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';

import ListCards from '../../shared/components/list-cards';

const BestSellerSectionStyles = styled('section')(props => ({
  padding: '8rem 16rem 6rem 16rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const BestSellerSection: React.FC = () => {
  const emotionTheme = useTheme();

  return (
    <BestSellerSectionStyles>
      <Typography.Title
        style={{
          fontFamily: "'Rufina', san-serif",
          fontSize: '3.2rem',
          fontWeight: 700,
          lineHeight: '3.952rem',
          letterSpacing: '10%',
          textTransform: 'uppercase',
          marginBottom: '1.2rem'
        }}
        level={3}
      >
        Best seller
      </Typography.Title>
      <Typography.Text
        style={{
          width: '55.2rem',
          textAlign: 'center',
          color: emotionTheme.colors.textSubtitle,
          fontSize: '1.6rem',
          fontWeight: 300,
          lineHeight: '2.24rem',
          marginBottom: '4rem'
        }}
      >
        Take a look at the most popular costumes at Fashion in recent times.
        Maybe you will like it!
      </Typography.Text>
      <ListCards columnCount={4} data={[1, 2, 3, 4, 5, 6, 7, 8]} />
    </BestSellerSectionStyles>
  );
};

export default BestSellerSection;