import styled from '@emotion/styled';
import { Layout, Typography } from 'antd';
import React from 'react';
import { v4 } from 'uuid';

import { MailIcon, MapMarkerIcon, PhoneIcon } from '../icon';

const LayoutFooter = styled(Layout.Footer)(props => ({
  textAlign: 'center',
  backgroundColor: props.theme.colors.footerBg,
  padding: '4rem 16rem 2rem 16rem',
  '& .footer-container': {
    display: 'grid',
    gridTemplateColumns: '25.4rem 26.8rem 17.3rem minmax(36.3rem, 1fr)',
    justifyItems: 'start',
    alignItems: 'start',
    columnGap: '3rem',
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
      ul: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem'
      }
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

const AppFooter: React.FC = () => {
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
        </section>
        <section>
          <Typography.Title level={5}>Quick Link</Typography.Title>
        </section>
        <section>
          <Typography.Title level={5}>
            Subcribe for our newsletter
          </Typography.Title>
        </section>
      </div>
    </LayoutFooter>
  );
};

export default AppFooter;
