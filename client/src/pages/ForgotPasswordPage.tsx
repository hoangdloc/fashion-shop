import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from 'antd';
import { motion } from 'framer-motion';
import React, { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import OTPInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { AppRoute } from '~/config/route';
import { MyButton } from '~/shared/components/button';
import MyFormItem from '~/shared/components/form-item';

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
`;

const FormContainer = styled.form`
  width: 80%;
  padding: 3.2rem 2.4rem;
  background-color: ${props => props.theme.colors.bgWhite};
  border-radius: 0.4rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  .brand-name {
    font-size: 3.2rem;
    font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
    letter-spacing: 0.1rem;
    text-align: center;
    margin-bottom: 2.8rem;
  }
  .sign-up {
    margin-top: 1.6rem;
    font-size: 1.4rem;
    text-align: center;
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

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  .description {
    display: block;
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 0.8rem;
  }
  .field-label {
    font-weight: 700;
    font-size: 1.4rem;
  }
  .btn-send {
    height: 4rem;
    text-transform: uppercase;
    font-weight: 700;
  }
  .resend-otp {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    .resend-btn {
      border: none;
      background-color: inherit;
      font-weight: 700;
      color: ${props => props.theme.colors.primaryBlack};
      transition: color 0.3s ease-in-out;
      &:hover {
        color: ${props => props.theme.colors.secondaryRed};
      }
      &:active {
        transform: scale(1.05);
      }
    }
  }
  img {
    width: 14rem;
    object-fit: cover;
    align-self: center;
  }
`;

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('Please enter valid email!')
      .required('Please enter your email!')
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const initialValues: FormData = {
  email: ''
};

const ForgotPasswordPage: React.FC = () => {
  const emotionTheme = useTheme();
  const [parent] = useAutoAnimate();
  const [showOtpSection, setShowOtpSection] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('');
  const {
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: initialValues
  });

  useLayoutEffect(() => {
    document.title = 'Fashion | Forgot Password';
  }, []);

  const onSendOtpBtnClick = (): void => {
    setShowOtpSection(true);
  };

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
        <FormContainer
          autoComplete="off"
          ref={parent}
        >
          <Typography.Title className="brand-name">Fashion</Typography.Title>
          {!showOtpSection && (
            <StepContainer>
              <Typography.Text className="description">
                Enter the email address associated with your account and
                we&lsquo;ll send you an OTP code to reset your password
              </Typography.Text>
              <MyFormItem
                containerWidth="100%"
                id="email"
                label={
                  <Typography.Text className="field-label">
                    Email
                  </Typography.Text>
                }
                control={control}
                hasError={errors.email != null}
                errorMessage={errors.email?.message}
                placeholder="Your email"
                showSuccessStatus
              />
              <MyButton
                className="btn-send"
                type="primary"
                block
                onClick={onSendOtpBtnClick}
              >
                Send otp code
              </MyButton>
            </StepContainer>
          )}
          {showOtpSection && (
            <StepContainer>
              <img
                src="/svg/mail-sent.svg"
                alt="Mail sent"
              />
              <Typography.Text className="description">
                Enter the OTP code we just sent to your email
              </Typography.Text>
              <OTPInput
                value={otpCode}
                onChange={setOtpCode}
                numInputs={6}
                renderInput={props => <input {...props} />}
                containerStyle={{
                  color: emotionTheme.colors.primaryBlack,
                  gap: '1rem',
                  justifyContent: 'center'
                }}
                inputStyle={{
                  width: '4rem',
                  height: '4rem',
                  border: `0.1rem solid ${emotionTheme.colors.horizontalColor}`,
                  borderRadius: '0.4rem',
                  fontSize: '1.6rem',
                  outlineColor: emotionTheme.colors.primaryBlack
                }}
              />
              <Typography.Text className="resend-otp">
                OTP not receive?{' '}
                <button
                  type="button"
                  className="resend-btn"
                >
                  Resend
                </button>
              </Typography.Text>
            </StepContainer>
          )}
          <Typography.Text className="sign-up">
            Don&lsquo;t have an account?{' '}
            <Link to={AppRoute.SIGNUP}>Sign up</Link>
          </Typography.Text>
        </FormContainer>
      </ForgotPasswordSection>
    </Container>
  );
};

export default ForgotPasswordPage;
