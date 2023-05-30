import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Tabs, Typography } from 'antd';
import React from 'react';

import { Gender } from '~/shared/@types/category';
import CarouselCards from '~/shared/components/carousel-cards';
import { useFetchClothingQuery } from '~/store/clothes/clothesService';

const FeaturedProductSectionStyles = styled.section`
  padding: 6rem 16rem 7rem 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${props => props.theme.devices.mobile} {
    padding: 2.4rem;
  }
  & > .featured-intro {
    text-align: center;
    font-family: ${props => props.theme.fontFamily.Rufina};
    font-size: 3.2rem;
    font-weight: 700;
    letter-spacing: 0.02rem;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
    @media ${props => props.theme.devices.mobile} {
      font-size: 2rem;
      margin-bottom: 0.4rem;
    }
  }
  & > .featured-description {
    width: 55.2rem;
    text-align: center;
    color: ${props => props.theme.colors.textSubtitle};
    font-size: 1.6rem;
    font-weight: 300;
    margin-bottom: 3.6rem;
    @media ${props => props.theme.devices.mobile} {
      width: 100%;
      font-size: 1.4rem;
      margin-bottom: 2.8rem;
    }
  }
  & .ant-tabs {
    width: 100%;
    & .ant-tabs-nav {
      margin-bottom: 1.6rem;
      &::before {
        content: none;
      }
      .ant-tabs-nav-list {
        display: flex;
        gap: 6.4rem;
        align-items: center;
        justify-content: center;
      }
      .ant-tabs-tab {
        margin: 0;
        &.ant-tabs-tab-active {
          & > .ant-tabs-tab-btn {
            color: ${props => props.theme.colors.secondaryRed};
          }
        }
      }
      .ant-tabs-ink-bar {
        background-color: ${props => props.theme.colors.secondaryRed};
        bottom: 1.2rem;
      }
    }
  }
`;

const FeaturedProductSection: React.FC = () => {
  const emotionTheme = useTheme();
  const { data, isFetching } = useFetchClothingQuery({ featured: true });
  const featuredWomenClothings = data?.data.clothings
    .filter(item => item.category[0] === Gender.WOMEN)
    .slice(0, 8);
  const featuredMenClothings = data?.data.clothings
    .filter(item => item.category[0] === Gender.MEN)
    .slice(0, 8);
  const featuredUnisexClothings = data?.data.clothings
    .filter(item => item.category[0] === Gender.UNISEX)
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
        className="featured-intro"
        level={3}
      >
        Featured product
      </Typography.Title>
      <Typography.Text className="featured-description">
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
