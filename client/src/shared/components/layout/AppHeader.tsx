import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import
{
  Badge,
  Dropdown,
  Layout,
  Space,
  Typography,
  type MenuProps
} from 'antd';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 } from 'uuid';

import fullLogo from '~/assets/images/logo-full.png';
import { AppRoute, ShopRoute } from '~/config/route';
import { Spinner } from '~/shared/components/loader';
import { authApi } from '~/store/auth/authService';
import { getCartItemsSelector } from '~/store/cart/cartSlice';
import type { RootState } from '~/store/store';
import { CartIcon, PhoneIcon } from '../icon';

const LayoutHeader = styled(Layout.Header)(props => ({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  width: '100%',
  height: '14.2rem',
  backgroundColor: props.theme.colors.bgWhite,
  padding: 0,
  borderBottom: `0.1rem solid ${props.theme.colors.horizontalColor}`,
  '.header-box': {
    height: '4rem',
    width: '100%',
    padding: '1.1rem 16rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '.phone-line': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.8rem'
    },
    '& .ant-typography': {
      color: 'inherit',
      fontSize: '1.4rem',
      fontFamily: props.theme.fontFamily.Oxygen
    }
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
      fontFamily: props.theme.fontFamily.PlayfairDisplay,
      fontSize: '1.6rem',
      textTransform: 'uppercase',
      color: props.theme.colors.primaryBlack,
      '& a:hover, span:hover': {
        color: props.theme.colors.secondaryRed
      },
      '.link-active': {
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

const shopItems: MenuProps['items'] = [
  {
    label: <Link to={`${AppRoute.SHOP}/${ShopRoute.MEN}`}>For Men</Link>,
    key: v4()
  },
  {
    label: <Link to={`${AppRoute.SHOP}/${ShopRoute.WOMEN}`}>For Women</Link>,
    key: v4()
  },
  {
    label: <Link to={`${AppRoute.SHOP}/${ShopRoute.UNISEX}`}>For Unisex</Link>,
    key: v4()
  }
];

const AppHeader: React.FC = () => {
  const [openShop, setOpenShop] = useState<boolean>(false);
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const nodeRef = useRef(null);
  const emotionTheme = useTheme();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isLoggingOut = useSelector(
    (state: RootState) => state.auth.isLoggingOut
  );
  const cartItems = useSelector(getCartItemsSelector);
  const [trigger] = authApi.useLazyUserLogoutQuery();

  const detailItems: MenuProps['items'] = [
    {
      label: 'Logout',
      key: v4(),
      itemIcon: isLoggingOut ? <Spinner size={14} /> : <LogoutOutlined />,
      onClick: () => {
        void trigger();
      },
      disabled: isLoggingOut
    }
  ];

  return (
    <LayoutHeader>
      <nav className="header-box">
        <a
          href="tel:+0123456789"
          className="phone-line"
        >
          <PhoneIcon />
          <Typography.Text>Hotline: (01) 23 456 789</Typography.Text>
        </a>
        <Dropdown
          menu={{ items: detailItems }}
          open={openDetails}
          onOpenChange={flag => {
            setOpenDetails(flag);
          }}
          trigger={['click']}
          arrow
        >
          <a
            onClick={e => {
              e.preventDefault();
            }}
          >
            <Typography.Text id="user-greeting">
              Welcome {userInfo?.firstName ?? 'Guest'}, have a nice day!
            </Typography.Text>
          </a>
        </Dropdown>
      </nav>
      <hr />
      <nav className="main-nav">
        <Link to={AppRoute.HOME}>
          <img
            className="brand-logo"
            src={fullLogo}
            alt="Fashion logo"
          />
        </Link>
        <ul className="nav-list">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'link-active' : undefined
              }
              to={AppRoute.HOME}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'link-active' : undefined
              }
              to={AppRoute.ABOUT}
              end
            >
              About us
            </NavLink>
          </li>
          <li>
            <Dropdown
              menu={{ items: shopItems }}
              onOpenChange={flag => {
                setOpenShop(flag);
              }}
              open={openShop}
            >
              <span>
                <Space align="start">
                  <NavLink
                    to={AppRoute.SHOP}
                    className={({ isActive }) =>
                      isActive ? 'link-active' : undefined
                    }
                  >
                    Shop
                  </NavLink>
                  <CSSTransition
                    ref={nodeRef}
                    in={openShop}
                    timeout={duration}
                  >
                    {state => (
                      <NavLink
                        to={AppRoute.SHOP}
                        style={({ isActive }) => {
                          return {
                            color: isActive
                              ? emotionTheme.colors.secondaryRed
                              : 'inherit'
                          };
                        }}
                      >
                        <DownOutlined
                          ref={nodeRef}
                          style={{
                            ...defaultDownOutlinedStyle,
                            ...transitionDownOutlinedStyles[state],
                            fontSize: '1.4rem'
                          }}
                        />
                      </NavLink>
                    )}
                  </CSSTransition>
                </Space>
              </span>
            </Dropdown>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'link-active' : undefined
              }
              to={AppRoute.CONTACT}
              end
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="customer-cart">
          <Badge
            color={emotionTheme.colors.secondaryRed}
            count={cartItems.length}
            showZero
          >
            <Link to={AppRoute.CART}>
              <CartIcon />
            </Link>
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
