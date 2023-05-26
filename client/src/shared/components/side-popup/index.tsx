import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';

import Backdrop from '../backdrop';

interface SidePopupProps extends React.ComponentPropsWithRef<'div'> {
  show: boolean
  children?: React.ReactNode
}

const SidePopupStyles = styled(motion.div)`
  padding: 3rem 2.4rem 3.6rem 2.4rem;
  position: fixed;
  background-color: ${props => props.theme.colors.bgWhite};
  width: 26.5rem;
  min-height: 31.8rem;
  right: 0;
  top: 6.4rem;
  z-index: 1000;
`;

const SidePopup = React.forwardRef<HTMLDivElement, SidePopupProps>(
  ({ show, children }, ref) => {
    return createPortal(
      <AnimatePresence>
        {show && (
          <Fragment>
            <SidePopupStyles
              className="burger-menu"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: 'tween' }}
              ref={ref}
            >
              {children}
            </SidePopupStyles>
            <Backdrop />
          </Fragment>
        )}
      </AnimatePresence>,
      document.body
    );
  }
);

SidePopup.displayName = 'SidePopup';

export default SidePopup;
