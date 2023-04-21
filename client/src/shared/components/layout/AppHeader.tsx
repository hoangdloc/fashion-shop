import { DownOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Badge, Dropdown, Layout, MenuProps, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 } from 'uuid';

import fullLogo from '../../../assets/images/logo-full.png';
import { CartIcon, PhoneIcon } from '../icon';

const LayoutHeader = styled(Layout.Header)(props => ({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  width: '100%',
  height: '14.2rem',
  backgroundColor: props.theme.colors.bgWhite,
  padding: 0,
  '.header-box': {
    height: '4rem',
    width: '100%',
    padding: '1.1rem 16rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '.phone-box': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.8rem'
    },
    '& .ant-typography': {
      color: props.theme.colors.primaryBlack,
      fontSize: '1.4rem',
      fontFamily: "'Oxygen', san-serif"
    }
  },
  hr: {
    border: 'none',
    height: '0.1rem',
    backgroundColor: '#D5D5D6'
  },
  '.main-nav': {
    width: '100%',
    padding: '0 16rem',
    height: '10.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .brand-logo': {
      width: '7.6rem',
      height: '7rem'
    },
    '& .nav-list': {
      display: 'flex',
      alignItems: 'center',
      gap: '5.2rem',
      fontFamily: "'Playfair Display', san-serif",
      fontSize: '1.6rem',
      textTransform: 'uppercase',
      '& a:hover': {
        color: props.theme.colors.secondaryRed
      },
      '.active': {
        color: props.theme.colors.secondaryRed,
        position: 'relative',
        '&:after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          border: `0.15rem solid ${props.theme.colors.secondaryRed}`,
          width: '1.6rem',
          bottom: '-0.4rem',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: props.theme.keyframes.pulse
        }
      }
    },
    '& .customer-cart': {
      display: 'flex',
      alignItems: 'center',
      gap: '1.6rem'
    }
  }
}));

const duration = 300;

const defaultDownOutlinedStyle = {
  transition: `transform ${duration}ms ease-in-out`,
  transform: 'rotate(0)'
};

const transitionDownOutlinedStyles = {
  entering: { transform: 'rotate(180deg)' },
  entered: { transform: 'rotate(180deg)' },
  exiting: { transform: 'rotate(0)' },
  exited: { transform: 'rotate(0)' },
  unmounted: { transform: 'rotate(0)' }
};

const items: MenuProps['items'] = [
  {
    label: 'For Men',
    key: v4()
  },
  {
    label: 'For Women',
    key: v4()
  },
  {
    label: 'For Unisex',
    key: v4()
  }
];

const AppHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const nodeRef = useRef(null);
  const emotionTheme = useTheme();

  const handleOpenChange = (flag: boolean): void => {
    setOpen(flag);
  };

  const handleMenuClick: MenuProps['onClick'] = e => {
    console.log('Hello World');
  };

  return (
    <LayoutHeader>
      <nav className="header-box">
        <div className="phone-box">
          <PhoneIcon />
          <Typography.Text>Hotline: (01) 23 456 789</Typography.Text>
        </div>
        <Typography.Text>Welcome Guest, have a nice day!</Typography.Text>
      </nav>
      <hr />
      <nav className="main-nav">
        <Link to="/">
          <img
            className="brand-logo"
            src={fullLogo}
            alt="Fashion logo"
          />
        </Link>
        <ul className="nav-list">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              to="/"
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              to="/about"
              end
            >
              About us
            </NavLink>
          </li>
          <li>
            <Dropdown
              menu={{
                items,
                onClick: handleMenuClick
              }}
              onOpenChange={handleOpenChange}
              open={open}
            >
              <a
                onClick={e => {
                  e.preventDefault();
                }}
              >
                <Space align="start">
                  <span>Shop</span>
                  <CSSTransition
                    ref={nodeRef}
                    in={open}
                    timeout={duration}
                  >
                    {state => (
                      <DownOutlined
                        ref={nodeRef}
                        style={{
                          ...defaultDownOutlinedStyle,
                          ...transitionDownOutlinedStyles[state],
                          fontSize: '1.4rem'
                        }}
                      />
                    )}
                  </CSSTransition>
                </Space>
              </a>
            </Dropdown>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              to="/contact"
              end
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="customer-cart">
          <Badge
            color={emotionTheme.colors.secondaryRed}
            count={0}
            showZero
          >
            <CartIcon />
          </Badge>
          <Typography.Text style={{ fontSize: '1.6rem' }}>
            $ 0.00
          </Typography.Text>
        </div>
      </nav>
    </LayoutHeader>
  );
};

export default AppHeader;
