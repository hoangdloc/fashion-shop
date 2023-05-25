import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';

import { ListCards } from '~/shared/components/list-cards';
import { useFetchClothingQuery } from '~/store/clothes/clothesService';

const BestSellerSectionStyles = styled.section`
  padding: 8rem 16rem 6rem 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${props => props.theme.devices.mobile} {
    padding: 2.4rem;
  }
  & > .best-seller-intro {
    font-family: ${props => props.theme.fontFamily.Rufina};
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 4rem;
    letter-spacing: 0.02rem;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
    @media ${props => props.theme.devices.mobile} {
      font-size: 2rem;
      margin-bottom: 0.4rem;
    }
  }
  & > .description {
    width: 55.2rem;
    text-align: center;
    color: ${props => props.theme.colors.textSubtitle};
    font-size: 1.6rem;
    font-weight: 300;
    line-height: 2.24rem;
    margin-bottom: 4rem;
    @media ${props => props.theme.devices.mobile} {
      font-size: 1.4rem;
      width: 100%;
      margin-bottom: 2rem;
    }
  }
`;

const BestSellerSection: React.FC = () => {
  const { data, isFetching } = useFetchClothingQuery({ bestSeller: true });
  const bestSellerClothings = data?.data.clothings.slice(0, 8);

  return (
    <BestSellerSectionStyles>
      <Typography.Title
        className="best-seller-intro"
        level={3}
      >
        Best seller
      </Typography.Title>
      <Typography.Text className="description">
        Take a look at the most popular costumes at Fashion in recent times.
        Maybe you will like it!
      </Typography.Text>
      <ListCards
        columnCount={4}
        data={bestSellerClothings}
        loading={isFetching}
      />
    </BestSellerSectionStyles>
  );
};

export default BestSellerSection;
