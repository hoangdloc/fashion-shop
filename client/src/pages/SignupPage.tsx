import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from 'antd';
import React, { useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import logo from '~/assets/images/logo-full.png';
import { AppRoute } from '~/config/route';
import { MyButton } from '~/shared/components/button';
import MyFormItem from '~/shared/components/form-item';
import { useUserSignupMutation } from '~/store/auth/authService';
import type { UserSignup } from '~/shared/@types/user';
import type { RootState } from '~/store/store';

const SignupPageStyles = styled('main')(props => ({
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
  '.signup-form': {
    padding: '4rem 6rem',
    backgroundColor: props.theme.colors.textWhite,
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0 0.2rem 0.6rem -0.1rem, rgba(0, 0, 0, 0.06) 0 0.1rem 0.4rem -0.1rem',
    borderRadius: '0.4rem',
    zIndex: 2,
    width: '53.7rem',
    fontSize: '1.4rem',
    '.group-form-items': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1.8rem'
    },
    '.form-items': {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    '.field-label': { fontWeight: 700, fontSize: '1.4rem' }
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
  background-image: linear-gradient(
    0deg,
    rgba(200, 200, 200, 0.1),
    rgba(200, 200, 200, 0.1)
  );
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
    firstName: yup.string().required('Please enter first name!'),
    lastName: yup.string().required('Please enter your last name!'),
    phoneNumber: yup
      .string()
      .required('Please enter your phone number')
      .matches(/^\d+$/, 'Phone number should have digits only!')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits'),
    email: yup
      .string()
      .email('Please enter valid email!')
      .required('Please enter your email!'),
    password: yup
      .string()
      .required('Please enter your password!')
      .min(8, 'Password must be at least 8 characters long')
      .max(32, 'Password must be less than 32 characters long'),
    term: yup.bool().oneOf([true]).required()
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const initialValues: FormData = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  term: false
};

const SignupPage: React.FC = () => {
  const emotionTime = useTheme();
  const [signup, { isLoading }] = useUserSignupMutation();
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

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
    const newUser: UserSignup = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password
    };
    await signup(newUser)
      .unwrap()
      .finally(() => {
        reset(initialValues);
      });
  });

  useLayoutEffect(() => {
    if (accessToken != null) navigate(AppRoute.HOME);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <SignupPageStyles>
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
        className="signup-form"
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
          Already have an account? <Link to={AppRoute.LOGIN}>Sign in</Link>
        </Typography.Text>
        <div className="form-items">
          <div className="group-form-items">
            <MyFormItem
              id="firstName"
              label={
                <Typography.Text className="field-label">
                  First name
                </Typography.Text>
              }
              control={control}
              hasError={errors.firstName != null}
              errorMessage={errors.firstName?.message}
              placeholder="Enter your first name"
              containerWidth="100%"
            />
            <MyFormItem
              id="lastName"
              label={
                <Typography.Text className="field-label">
                  Last name
                </Typography.Text>
              }
              control={control}
              hasError={errors.lastName != null}
              errorMessage={errors.lastName?.message}
              placeholder="Enter your last name"
              containerWidth="100%"
            />
          </div>
          <MyFormItem
            id="phoneNumber"
            label={
              <Typography.Text className="field-label">
                Phone number
              </Typography.Text>
            }
            control={control}
            hasError={errors.phoneNumber != null}
            errorMessage={errors.phoneNumber?.message}
            placeholder="Enter your phone number"
            containerWidth="100%"
          />
          <MyFormItem
            id="email"
            label={
              <Typography.Text className="field-label">Email</Typography.Text>
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
              <Typography.Text className="field-label">
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
          <MyFormItem
            id="term"
            type="checkbox"
            control={control}
          >
            I agree to the Tearms of Use and have read and understand the
            Privacy policy.
          </MyFormItem>
        </div>
        <MyButton
          htmlType="submit"
          type="primary"
          block
          size="large"
          disabled={!isValid}
          loading={isLoading}
        >
          Sign up
        </MyButton>
      </form>
    </SignupPageStyles>
  );
};

export default SignupPage;
