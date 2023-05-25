import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import commerce1 from '~/assets/images/commerce1.png';
import commerce2 from '~/assets/images/commerce2.png';

import { AppRoute } from '~/config/route';
import { MyButton } from '~/shared/components/button';

const CommerceSectionStyles = styled.section`
  padding: 8rem 16rem 4rem 16rem;
  display: grid;
  grid-template-columns: 44rem 55.2rem;
  justify-content: space-between;
  gap: 12rem;
  @media ${props => props.theme.devices.mobile} {
    grid-template-columns: 1fr;
    padding: 4rem 2.4rem 6rem 2.4rem;
    row-gap: 4rem;
  }
`;

const CommerceTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  & > .ant-typography {
    margin: 0 !important;
  }
  & > .commerce-intro {
    font-weight: 300;
    font-size: 2rem;
    opacity: 0.8;
    text-transform: uppercase;
    margin-bottom: 2.4rem !important;
    position: relative;
    &::after {
      content: '';
      display: block;
      height: 0.15rem;
      width: 10rem;
      background-color: ${props => props.theme.colors.primaryBlack};
      position: absolute;
      bottom: -1.2rem;
    }
  }
  & > .commerce-title {
    font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
    font-size: 2.8rem;
    text-transform: uppercase;
    margin-bottom: 2.4rem !important;
    letter-spacing: 0.08rem;
  }
  & > .commerce-description {
    font-size: 1.6rem;
    font-weight: 300;
    margin-bottom: 6rem !important;
    width: 36.3rem;
    color: ${props => props.theme.colors.textSubtitle};
    @media ${props => props.theme.devices.mobile} {
      margin-bottom: 4rem !important;
      font-size: 1.4rem;
      width: 100%;
    }
  }
  & > .view-product-btn {
    border: 0.2rem solid ${props => props.theme.colors.primaryBlack};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 5.4rem;
    text-transform: uppercase;
    height: 5.2rem;
    &:hover {
      background-color: ${props => props.theme.colors.bgWhite};
      color: ${props => props.theme.colors.primaryBlack};
      border: 0.2rem solid ${props => props.theme.colors.primaryBlack};
    }
  }
`;

const CommerceImgBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .img-box {
    background-color: ${props => props.theme.colors.primaryBlack};
    img: {
      width: 100%;
      object-fit: cover;
    }
    & > .commerce-img-1 {
      opacity: 0.9;
    }
    & > .commerce-img-2 {
      opacity: 0.85;
    }
  }
  .float {
    position: absolute;
    top: 4rem;
    left: -9.5rem;
    z-index: 1;
  }
  @media ${props => props.theme.devices.mobile} {
    position: static;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.4rem;
    width: 100%;
    .img-box {
      width: 100%;
      & > .commerce-img-1 {
        width: 100%;
        height: 100%;
      }
      & > .commerce-img-2 {
        width: 100%;
        height: 100%;
    }
    }
    .float {
      position: static;
    }
  }
`;

const CommerceSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CommerceSectionStyles>
      <CommerceTextBox>
        <Typography.Title
          className="commerce-intro"
          level={3}
        >
          Fashion&lsquo;s portfolio
        </Typography.Title>
        <Typography.Title
          className="commerce-title"
          level={4}
        >
          Lookbook for men
        </Typography.Title>
        <Typography.Text className="commerce-description">
          Fashion is a both of womenswear and menswear store dedicated to
          creating considered everyday pieces of the highest quality.
        </Typography.Text>
        <MyButton
          className="view-product-btn"
          type="primary"
          size="large"
          onClick={() => {
            navigate(AppRoute.SHOP);
          }}
        >
          View our product
        </MyButton>
      </CommerceTextBox>
      <CommerceImgBox>
        <div className="img-box float">
          <img
            className="commerce-img-1"
            src={commerce1}
            alt="A man watching his phone"
          />
        </div>
        <div className="img-box">
          <img
            className="commerce-img-2"
            src={commerce2}
            alt="A man wearing vest"
          />
        </div>
      </CommerceImgBox>
    </CommerceSectionStyles>
  );
};

export default CommerceSection;
