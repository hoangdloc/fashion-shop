import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Layout, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

import CashSVG from '../../../assets/svg/cash.svg';
import PaypalSVG from '../../../assets/svg/paypal.svg';
import VisaSVG from '../../../assets/svg/visa.svg';
import { AppRoute } from '../../../config/route';
import MyButton from '../button';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapMarkerIcon,
  PhoneIcon
} from '../icon';
import MyInput from '../input';

const LayoutFooter = styled(Layout.Footer)(props => ({
  backgroundColor: props.theme.colors.footerBg,
  padding: '0 16rem',
  '& .footer-container': {
    padding: '4rem 0 6rem 0',
    paddingBottom: '6rem',
    display: 'grid',
    // gridTemplateColumns: '25.4rem 26.8rem 17.3rem 36.3rem',
    gridTemplateColumns: 'minmax(25.4rem, 1fr) 1fr minmax(17.3rem, 1fr) 1fr',
    justifyItems: 'start',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'start',
    columnGap: '1.6rem',
    '& a': {
      display: 'flex',
      alignItems: 'start',
      gap: '0.8rem',
      p: {
        fontSize: '1.4rem',
        margin: 0
      }
    },
    '& .ant-typography': {
      fontSize: '1.6rem',
      textTransform: 'uppercase'
    },
    '& > section': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      gap: '2.6rem',
      '& > ul': {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem'
      },
      '& > div': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '2rem',
        form: {
          display: 'flex',
          alignItems: 'center',
          '& + ul': {
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem'
          }
        }
      }
    }
  },
  '& .copyright': {
    padding: '2rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > .payments': {
      display: 'flex',
      alignItems: 'center',
      gap: '1.2rem'
    }
  }
}));

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
  const emotionTheme = useTheme();

  return (
    <LayoutFooter>
      <div className="footer-container">
        <section>
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
        </section>
        <section>
          <Typography.Title level={5}>Get help</Typography.Title>
          <ul>
            {getHelpItems.map(item => (
              <li key={v4()}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <Typography.Title level={5}>Quick Link</Typography.Title>
          <ul>
            {quickLinkItems.map(item => (
              <li key={v4()}>{item.label}</li>
            ))}
          </ul>
        </section>
        <section>
          <Typography.Title level={5}>
            Subcribe for our newsletter
          </Typography.Title>
          <div>
            <form>
              <MyInput
                style={{
                  minWidth: '36.3rem',
                  maxWidth: '100%',
                  height: '4rem',
                  fontSize: '1.4rem',
                  padding: '1rem 1.2rem',
                  border: `0.15rem solid ${emotionTheme.colors.primaryBlack}`
                }}
                placeholder="youremail.@gmail.com"
                placeholderColor="#666666"
              />
              <MyButton
                onClick={e => {
                  e.preventDefault();
                }}
                type="primary"
                style={{
                  height: '4rem',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  padding: '1rem 1.6rem',
                  border: 'none'
                }}
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
        </section>
      </div>
      <hr />
      <div className="copyright">
        <Typography.Text
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.2rem' }}
        >
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
      </div>
    </LayoutFooter>
  );
};

export default AppFooter;
