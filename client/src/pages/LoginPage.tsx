import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import logo from '~/assets/images/logo-full.png';
import { AppRoute } from '~/config/route';
import { MyButton } from '~/shared/components/button';
import MyFormItem from '~/shared/components/form-item';
import { useUserLoginMutation } from '~/store/auth/authService';

import type { RootState } from '~/store/store';

const LoginPageStyles = styled('main')(props => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: props.theme.colors.bgWhite,
  '.logo': {
    width: '5.2rem',
    height: '5.2rem',
    position: 'absolute',
    top: '4rem',
    left: '4rem',
    zIndex: 1
  },
  '.login-form': {
    padding: '5rem 6rem',
    backgroundColor: props.theme.colors.textWhite,
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0 0.2rem 0.6rem -0.1rem, rgba(0, 0, 0, 0.06) 0 0.1rem 0.4rem -0.1rem',
    borderRadius: '0.4rem',
    zIndex: 2,
    width: '43.7rem',
    fontSize: '1.4rem',
    '.form-items': {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
  },
  a: {
    color: props.theme.colors.secondaryRed,
    textDecoration: 'underline',
    '&:hover': {
      color: props.theme.colors.secondaryRed,
      textDecoration: 'underline'
    }
  }
}));

const EllipseBgStyles = styled('div')`
  background-image:
      linear-gradient(0deg, rgba(200, 200, 200, 0.1), rgba(200, 200, 200, 0.1));
    width: 200rem;
    height: 200rem;
    border-radius: 100%;
    position: absolute;
    top: 50%;
    z-index: 1;
`;

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('Please enter valid email!')
      .required('Please enter your email!'),
    password: yup.string().required('Please enter your password!')
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const LoginPage: React.FC = () => {
  const emotionTime = useTheme();
  const [login, { isLoading }] = useUserLoginMutation();
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const initialValues: FormData = {
    email: '',
    password: ''
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: initialValues
  });

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    if (!isValid) return;
    await login(data)
      .unwrap()
      .finally(() => {
        reset(initialValues);
      });
  });

  useEffect(() => {
    if (accessToken != null) navigate(AppRoute.HOME);
  }, [accessToken]);

  return (
    <LoginPageStyles>
      <img
        src={logo}
        alt="Fashion"
        className="logo"
        draggable={false}
      />
      <EllipseBgStyles />
      <form
        onSubmit={e => {
          void onSubmit(e);
        }}
        className="login-form"
        autoComplete="off"
      >
        <Typography.Title
          style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}
        >
          Welcome back!
        </Typography.Title>
        <Typography.Text
          style={{
            fontSize: '1.4rem',
            color: emotionTime.colors.textGray,
            textAlign: 'center',
            display: 'block',
            marginBottom: '2rem'
          }}
        >
          Don&lsquo;t have an account? <Link to={AppRoute.SIGNUP}>Sign up</Link>
        </Typography.Text>
        <div className="form-items">
          <MyFormItem
            id="email"
            label={
              <Typography.Text style={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Email
              </Typography.Text>
            }
            control={control}
            hasError={errors.email != null}
            errorMessage={errors.email?.message}
            placeholder="Enter your email"
            containerWidth="100%"
          />
          <MyFormItem
            id="password"
            label={
              <Typography.Text style={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Password
              </Typography.Text>
            }
            type="password"
            control={control}
            hasError={errors.password != null}
            errorMessage={errors.password?.message}
            placeholder="Enter your password"
            containerWidth="100%"
          />
        </div>
        <Link
          style={{
            textAlign: 'right',
            display: 'block',
            textDecoration: 'none',
            marginBottom: '2rem'
          }}
          to="#"
        >
          Forgot password?
        </Link>
        <MyButton
          htmlType="submit"
          type="primary"
          block
          size="large"
          loading={isLoading}
        >
          Sign in
        </MyButton>
      </form>
    </LoginPageStyles>
  );
};

export default LoginPage;
