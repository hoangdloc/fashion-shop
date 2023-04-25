import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Tabs, Typography } from 'antd';
import React from 'react';

import MyCarousel from '../../shared/components/carousel';
import ClothesCard from '../../shared/components/clothes-card';

const FeaturedProductSectionStyles = styled('section')(props => ({
  padding: '6rem 16rem 7rem 16rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& .ant-tabs-nav': {
    marginBottom: '1.6rem',
    '&::before': {
      content: 'none'
    },
    '.ant-tabs-nav-list': {
      display: 'flex',
      gap: '6.4rem',
      alignItems: 'center',
      justifyContent: 'center'
    },
    '.ant-tabs-tab': {
      margin: 0,
      '&.ant-tabs-tab-active': {
        '& > .ant-tabs-tab-btn': {
          color: props.theme.colors.secondaryRed
        }
      }
    },
    '.ant-tabs-ink-bar': {
      backgroundColor: props.theme.colors.secondaryRed,
      bottom: '1.2rem'
    }
  }
}));

const tabItems = [
  {
    label: "Women's",
    key: 'women',
    children: null
  },
  {
    label: "Men's",
    key: 'men',
    children: null
  },
  {
    label: "Unisex's",
    key: 'unisex',
    children: null
  }
];

const dataTest = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const FeaturedProductSection: React.FC = () => {
  const emotionTheme = useTheme();

  return (
    <FeaturedProductSectionStyles>
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
        Featured product
      </Typography.Title>
      <Typography.Text
        style={{
          width: '55.2rem',
          textAlign: 'center',
          color: emotionTheme.colors.textSubtitle,
          fontSize: '1.6rem',
          fontWeight: 300,
          lineHeight: '2.24rem',
          marginBottom: '3.6rem'
        }}
      >
        Wanna shine with the most outstanding outfits? Let&lsquo;s see our
        featured products and choose the best choice for you
      </Typography.Text>
      <Tabs
        size="large"
        defaultActiveKey="1"
        centered
        animated={{ inkBar: true, tabPane: true }}
        tabBarStyle={{
          fontSize: '1.6rem',
          fontFamily: "'Playfair Display', san-serif",
          lineHeight: '2.24rem',
          fontWeight: 400,
          textTransform: 'uppercase'
        }}
        items={tabItems}
      />
      <MyCarousel
        total={dataTest.length}
        renderItem={<ClothesCard />}
      />
    </FeaturedProductSectionStyles>
  );
};

export default FeaturedProductSection;
