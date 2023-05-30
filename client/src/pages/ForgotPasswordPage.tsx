import styled from '@emotion/styled';
import { Typography } from 'antd';
import { motion } from 'framer-motion';
import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '~/config/route';
import {
  EmailForm,
  OTPForm,
  PasswordForm,
  type ShowSection
} from '~/modules/forgot-password';

const Container = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.bgWhite};
`;

const ImgContainer = styled(motion.section)`
  padding: 4.8rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    transform: scaleX(-1);
  }
  @media ${props => props.theme.devices.mobile} {
    display: none;
  }
`;

const ForgotPasswordSection = styled(motion.section)`
  position: relative;
  padding: 4.8rem;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.primaryBlack};
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-typography {
    margin: 0;
  }
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.bgWhite};
    opacity: 0.04;
    clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0% 100%);
    position: absolute;
    top: 0;
    left: 0;
  }
  @media ${props => props.theme.devices.mobile} {
    padding: 0;
  }
`;

const StepContainer = styled.div`
  width: 80%;
  padding: 3.2rem 2.4rem;
  background-color: ${props => props.theme.colors.bgWhite};
  border-radius: 0.4rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  @media ${props => props.theme.devices.mobile} {
    width: 94%;
    padding: 2.8rem 2rem;
    gap: 1rem;
  }
  .brand-name {
    font-size: 3.2rem;
    font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
    letter-spacing: 0.1rem;
    text-align: center;
    margin-bottom: 2.8rem;
    @media ${props => props.theme.devices.mobile} {
      font-size: 2.8rem;
      margin-bottom: 1.8rem;
    }
  }
  .sign-up {
    margin-top: 1.6rem;
    font-size: 1.4rem;
    text-align: center;
    @media ${props => props.theme.devices.mobile} {
      margin-top: 1.4rem;
    }
  }
  a {
    color: ${props => props.theme.colors.secondaryRed};
    text-decoration: underline;
    &:hover {
      color: ${props => props.theme.colors.secondaryRed};
      text-decoration: underline;
    }
  }
`;

const ForgotPasswordPage: React.FC = () => {
  const [showSection, setShowSection] = useState<ShowSection>('password');

  useLayoutEffect(() => {
    document.title = 'Fashion | Forgot Password';
  }, []);

  return (
    <Container>
      <ImgContainer
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ type: 'tween', duration: 0.5 }}
      >
        <img
          src="/svg/forgot-password.svg"
          alt="A person look into password field"
          draggable={false}
        />
      </ImgContainer>
      <ForgotPasswordSection
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ type: 'tween', duration: 0.5 }}
      >
        <StepContainer>
          <Typography.Title className="brand-name">Fashion</Typography.Title>
          {showSection === 'email' && (
            <EmailForm setShowSection={setShowSection} />
          )}
          {showSection === 'otp' && <OTPForm setShowSection={setShowSection} />}
          {showSection === 'password' && <PasswordForm />}
          <Typography.Text className="sign-up">
            Don&lsquo;t have an account?{' '}
            <Link to={AppRoute.SIGNUP}>Sign up</Link>
          </Typography.Text>
        </StepContainer>
      </ForgotPasswordSection>
    </Container>
  );
};

export default ForgotPasswordPage;
