import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Tabs, Typography } from 'antd';
import React from 'react';

import { Gender } from '~/shared/@types/category';
import CarouselCards from '~/shared/components/carousel-cards';
import { useFetchClothingQuery } from '~/store/clothes/clothesService';

const FeaturedProductSectionStyles = styled('section')(props => ({
  padding: '6rem 16rem 7rem 16rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& .ant-tabs': {
    width: '100%',
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
  }
}));

const FeaturedProductSection: React.FC = () => {
  const emotionTheme = useTheme();
  const { data, isFetching } = useFetchClothingQuery({ featured: true });
  const featuredWomenClothings = data
    ?.filter(item => item.category[0] === Gender.WOMEN)
    .slice(0, 8);
  const featuredMenClothings = data
    ?.filter(item => item.category[0] === Gender.MEN)
    .slice(0, 8);
  const featuredUnisexClothings = data
    ?.filter(item => item.category[0] === Gender.UNISEX)
    .slice(0, 8);

  const tabItems = [
    {
      label: "Women's",
      key: Gender.WOMEN,
      children: (
        <CarouselCards
          loading={isFetching}
          data={featuredWomenClothings}
        />
      )
    },
    {
      label: "Men's",
      key: Gender.MEN,
      children: (
        <CarouselCards
          loading={isFetching}
          data={featuredMenClothings}
        />
      )
    },
    {
      label: "Unisex's",
      key: Gender.UNISEX,
      children: (
        <CarouselCards
          loading={isFetching}
          data={featuredUnisexClothings}
        />
      )
    }
  ];

  return (
    <FeaturedProductSectionStyles>
      <Typography.Title
        style={{
          fontFamily: emotionTheme.fontFamily.Rufina,
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
        defaultActiveKey={Gender.WOMEN}
        centered
        animated={{ inkBar: true, tabPane: true }}
        tabBarStyle={{
          fontSize: '1.6rem',
          fontFamily: emotionTheme.fontFamily.PlayfairDisplay,
          lineHeight: '2.24rem',
          fontWeight: 400,
          textTransform: 'uppercase'
        }}
        items={tabItems}
      />
    </FeaturedProductSectionStyles>
  );
};

export default FeaturedProductSection;
