import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';
import { useLockBodyScroll } from '~/shared/hooks/useLockBodyScroll';

const BackdropStyles = styled(motion.div)`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: 100vw;
  z-index: 999;
`;

const Backdrop: React.FC = () => {
  useLockBodyScroll();

  return createPortal(
    <BackdropStyles
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'tween' }}
    />,
    document.body
  );
};

export default Backdrop;
