import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { AppRoute, ShopRoute } from '~/config/route';
import { useCart } from '~/contexts/cart-context';
import {
  BackArrowIcon,
  BurgerIcon,
  RightChevronIcon
} from '~/shared/components/icon';
import SidePopup from '~/shared/components/side-popup';
import { useOnClickOutside } from '~/shared/hooks/useOnClickOutside';
import { MyLinkButton } from '../button';

const BurgerPopupContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem;
  & > .cancel-btn {
    transition: scale 0.2s ease-in-out;
    &:active {
      scale: 1.1;
    }
  }
  & > .cart-link {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    height: 5.2rem;
    border: solid 0.15rem ${props => props.theme.colors.primaryBlack};
    &:hover {
      border: solid 0.15rem ${props => props.theme.colors.secondaryRed};
      color: ${props => props.theme.colors.secondaryRed};
    }
  }
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.4rem;
  width: 100%;
  & > .link-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 1.6rem;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: ${props => props.theme.colors.secondaryRed};
    }
    &.link-active {
      color: ${props => props.theme.colors.secondaryRed};
      & > .link-title {
        position: relative;
        font-weight: 700;
        &:after {
          content: '';
          display: block;
          position: absolute;
          height: 0.15rem;
          background-color: ${props => props.theme.colors.secondaryRed};
          width: 1.6rem;
          bottom: -0.4rem;
          left: 50%;
          transform: translateX(-50%);
          animation: ${props => props.theme.keyframes.pulse};
        }
      }
    }
  }
`;

const ShopPopupContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem;
  & > .back-btn {
    display: flex;
    gap: 0.8rem;
    transition: scale 0.2s ease-in-out;
    & > span {
      font-size: 1.6rem;
      text-transform: uppercase;
      opacity: 0.4;
    }
    &:active {
      scale: 1.1;
    }
  }
`;

const shopItems = [
  {
    to: `${AppRoute.SHOP}/${ShopRoute.WOMEN}`,
    label: 'For Women'
  },
  {
    to: `${AppRoute.SHOP}/${ShopRoute.MEN}`,
    label: 'For Men'
  },
  {
    to: `${AppRoute.SHOP}/${ShopRoute.UNISEX}`,
    label: 'For Unisex'
  }
];

const BurgerSection: React.FC<
React.HTMLAttributes<HTMLButtonElement>
> = props => {
  const [showAppMenu, setShowAppMenu] = useState<boolean>(false);
  const [showShopMenu, setShowShopMenu] = useState<boolean>(false);
  const burgerAppMenuRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();

  const handleOpenAppMenu = (): void => {
    setShowAppMenu(true);
  };

  const handleCloseAppMenu = (): void => {
    setShowAppMenu(false);
    setShowShopMenu(false);
  };

  const handleOpenShopMenu = (): void => {
    setShowShopMenu(true);
  };

  const handleCloseShopMenu = (): void => {
    setShowShopMenu(false);
  };

  useOnClickOutside(burgerAppMenuRef, handleCloseAppMenu);

  return (
    <Fragment>
      <button
        {...props}
        onClick={handleOpenAppMenu}
      >
        <BurgerIcon />
      </button>
      <SidePopup
        ref={burgerAppMenuRef}
        show={showAppMenu}
      >
        <AnimatePresence
          initial={false}
          mode="popLayout"
        >
          {!showShopMenu && (
            <BurgerPopupContainer
              key="app-menu"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'tween' }}
            >
              <button
                className="cancel-btn"
                onClick={handleCloseAppMenu}
              >
                <BackArrowIcon />
              </button>
              <NavList>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'link-item link-active' : 'link-item'
                  }
                  to={AppRoute.HOME}
                  onClick={handleCloseAppMenu}
                  end
                >
                  <span className="link-title">Home</span>
                  <RightChevronIcon />
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'link-item link-active' : 'link-item'
                  }
                  to={AppRoute.ABOUT}
                  onClick={handleCloseAppMenu}
                  end
                >
                  <span className="link-title">About</span>
                  <RightChevronIcon />
                </NavLink>
                <button
                  className="link-item"
                  onClick={handleOpenShopMenu}
                >
                  <span className="link-title">Shop</span>
                  <RightChevronIcon />
                </button>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'link-item link-active' : 'link-item'
                  }
                  to={AppRoute.CONTACT}
                  onClick={handleCloseAppMenu}
                  end
                >
                  <span className="link-title">Contact</span>
                  <RightChevronIcon />
                </NavLink>
              </NavList>
              <MyLinkButton
                to={AppRoute.CART}
                className="cart-link"
                onClick={handleCloseAppMenu}
              >
                Cart ({cart.length})
              </MyLinkButton>
            </BurgerPopupContainer>
          )}
          {showShopMenu && (
            <ShopPopupContainer
              key="shop-menu"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'tween' }}
            >
              <button
                className="back-btn"
                onClick={handleCloseShopMenu}
              >
                <BackArrowIcon />
                <span>Shop</span>
              </button>
              <NavList>
                {shopItems.map((item, index) => (
                  <NavLink
                    key={index}
                    className={({ isActive }) =>
                      isActive ? 'link-item link-active' : 'link-item'
                    }
                    to={item.to}
                    onClick={handleCloseAppMenu}
                    end
                  >
                    <span className="link-title">{item.label}</span>
                    <RightChevronIcon />
                  </NavLink>
                ))}
              </NavList>
            </ShopPopupContainer>
          )}
        </AnimatePresence>
      </SidePopup>
    </Fragment>
  );
};

export default BurgerSection;
