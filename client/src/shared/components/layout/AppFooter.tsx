import styled from '@emotion/styled';
import { Layout, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

import CashSVG from '~/assets/svg/cash.svg';
import PaypalSVG from '~/assets/svg/paypal.svg';
import VisaSVG from '~/assets/svg/visa.svg';
import { AppRoute } from '~/config/route';
import { MyButton } from '~/shared/components/button';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapMarkerIcon,
  PhoneIcon
} from '~/shared/components/icon';
import { MyOutlinedInput } from '~/shared/components/input';
import { useFakeLoading } from '~/shared/hooks/useFakeLoading';

const LayoutFooter = styled(Layout.Footer)`
  background-color: ${props => props.theme.colors.footerBg};
  padding: 0 16rem;
  @media ${props => props.theme.devices.mobile} {
    padding: 0 2.4rem;
  }
`;

const FooterContainer = styled.div`
  padding: 4rem 0 6rem 0;
  display: grid;
  grid-template-columns: minmax(25.4rem, 1fr) 1fr minmax(17.3rem, 1fr) 1fr;
  justify-items: start;
  justify-content: center;
  align-content: center;
  align-items: start;
  column-gap: 1.6rem;
  @media ${props => props.theme.devices.mobile} {
    padding: 3.2rem 0 5.3rem 0;
    grid-template-columns: none;
    grid-template-areas:
      'subcribe subcribe'
      'contact contact'
      'quick_links get_help';
    row-gap: 3.2rem;
    justify-content: space-between;
  }
  & a {
    display: flex;
    align-items: start;
    gap: 0.8rem;
    p {
      font-size: 1.4rem;
      margin: 0;
    }
  }
  & .ant-typography {
    font-size: 1.6rem;
    text-transform: uppercase;
    margin: 0;
  }
`;

const SectionStyles = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 3rem;
  @media ${props => props.theme.devices.mobile} {
    gap: 1.6rem;
  }
  & > ul {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    form {
      width: 100%;
      display: flex;
      align-items: center;
      & > .btn-submit {
        height: 4rem;
        font-size: 1.4rem;
        font-weight: 700;
        padding: 1rem 1.6rem;
        border: none;
      }
      & + ul {
        display: flex;
        align-items: center;
        gap: 1.2rem;
      }
    }
  }
  .subcribe-input {
    min-width: 36.3rem;
    max-width: 100%;
    height: 4rem;
    font-size: 1.4rem;
    padding: 1rem 1.2rem;
    border: 0.15rem solid ${props => props.theme.colors.primaryBlack};
  }
  @media ${props => props.theme.devices.mobile} {
    &:first-child {
      grid-area: contact;
    }
    &:nth-child(2) {
      grid-area: get_help;
    }
    &:nth-child(3) {
      grid-area: quick_links;
    }
    &:last-child {
      grid-area: subcribe;
    }
  }
`;

const CopyrightContainer = styled.div`
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .copyright-text {
    font-family: ${props => props.theme.fontFamily.DmSans};
    font-size: 1.2rem;
    @media ${props => props.theme.devices.mobile} {
      font-size: 1.4rem;
    }
  }
  & > .payments {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
  @media ${props => props.theme.devices.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }
`;

const contactItems = [
  {
    href: 'tel:+0123456789',
    icon: <PhoneIcon />,
    label: '(01) 23 456 789'
  },
  {
    href: 'mailto:support.fashion@gmail.com',
    icon: <MailIcon />,
    label: 'support.fashion@gmail.com'
  },
  {
    href: 'https://maps.google.com/maps?q=254+Milacina+Streets,+Behansed+Tower,+London',
    icon: <MapMarkerIcon />,
    label: '254 Milacina Streets, Behansed Tower, London'
  }
];

const getHelpItems = [
  {
    label: 'Privacy Policy',
    href: '#'
  },
  {
    label: 'Customer Service',
    href: '#'
  },
  {
    label: 'Payment options',
    href: '#'
  }
];

const socialItems = [
  {
    label: <InstagramIcon />,
    href: 'https://www.instagram.com/hoang__loc/'
  },
  {
    label: <FacebookIcon />,
    href: 'https://www.facebook.com/mr.cairne/'
  },
  {
    label: <LinkedInIcon />,
    href: 'https://www.linkedin.com/in/hoang-loc/'
  }
];

const quickLinkItems = [
  {
    label: <Link to={AppRoute.ABOUT}>About us</Link>
  },
  {
    label: <Link to={AppRoute.SHOP}>Shop</Link>
  },
  {
    label: <Link to={AppRoute.CART}>Cart</Link>
  }
];

const paymentItems = [
  {
    svgSrc: CashSVG,
    alt: 'Suport COD'
  },
  {
    svgSrc: VisaSVG,
    alt: 'Support VISA'
  },
  {
    svgSrc: PaypalSVG,
    alt: 'Support Paypal'
  }
];

const AppFooter: React.FC = () => {
  const { loading, fakeLoading } = useFakeLoading();

  return (
    <LayoutFooter>
      <FooterContainer>
        <SectionStyles>
          <Typography.Title level={5}>Contact us</Typography.Title>
          <ul>
            {contactItems.map(item => (
              <li key={v4()}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.icon}
                  <p>{item.label}</p>
                </a>
              </li>
            ))}
          </ul>
        </SectionStyles>
        <SectionStyles>
          <Typography.Title level={5}>Get help</Typography.Title>
          <ul>
            {getHelpItems.map(item => (
              <li key={v4()}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </SectionStyles>
        <SectionStyles>
          <Typography.Title level={5}>Quick Link</Typography.Title>
          <ul>
            {quickLinkItems.map(item => (
              <li key={v4()}>{item.label}</li>
            ))}
          </ul>
        </SectionStyles>
        <SectionStyles>
          <Typography.Title level={5}>
            Subcribe for our newsletter
          </Typography.Title>
          <div>
            <form>
              <MyOutlinedInput
                className="subcribe-input"
                placeholder="youremail.@gmail.com"
                placeholderColor="#666666"
              />
              <MyButton
                className="btn-submit"
                onClick={() => {
                  void fakeLoading();
                }}
                type="primary"
                loading={loading}
              >
                Submit
              </MyButton>
            </form>
            <ul>
              {socialItems.map(item => (
                <li key={v4()}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </SectionStyles>
      </FooterContainer>
      <hr />
      <CopyrightContainer>
        <Typography.Text className="copyright-text">
          &copy;2022 Fashion Designer, Adamo Software
        </Typography.Text>
        <ul className="payments">
          {paymentItems.map(item => (
            <li key={v4()}>
              <img
                src={item.svgSrc}
                alt={item.alt}
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </CopyrightContainer>
    </LayoutFooter>
  );
};

export default AppFooter;
