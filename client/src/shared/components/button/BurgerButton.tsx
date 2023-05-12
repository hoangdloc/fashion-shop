import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';

import { BurgerIcon } from '~/shared/components/icon';
import useClickOutside from '~/shared/hooks/useClickOutside';
import Backdrop from '../backdrop';

const BurgerButtonContainer = styled.div`
  position: relative;
`;

const BurgerButton: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  const { show, setShow, nodeRef } = useClickOutside();

  const handleOpenDropdown = (): void => {
    setShow(true);
  };

  return (
    <BurgerButtonContainer
      ref={nodeRef}
      {...props}
    >
      <button onClick={handleOpenDropdown}>
        <BurgerIcon />
      </button>
      <BurgerMenu show={show} />
    </BurgerButtonContainer>
  );
};

interface BurgerMenuProps extends React.ComponentProps<'div'> {
  show: boolean
}

const BurgerMenuStyles = styled(motion.div)`
  position: absolute;
  background-color: ${props => props.theme.colors.bgWhite};
  width: 26.5rem;
  height: 33.7rem;
  right: 0;
  top: 6.4rem;
  z-index: 1000;
`;

const BurgerMenu: React.FC<BurgerMenuProps> = ({ show }) => {
  return createPortal(
    <AnimatePresence>
      {show && (
        <Fragment>
          <BurgerMenuStyles
            className="burger-menu"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'tween' }}
          >
            CONTENT
          </BurgerMenuStyles>
          <Backdrop />
        </Fragment>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BurgerButton;
