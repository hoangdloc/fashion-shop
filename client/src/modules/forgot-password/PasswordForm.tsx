import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { AppRoute } from '~/config/route';
import { MyButton } from '~/shared/components/button';
import MyFormItem from '~/shared/components/form-item';
import { useResetPasswordMutation } from '~/store/auth/authService';

import { type RootState } from '~/store/store';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  .field-label {
    font-weight: 700;
    font-size: 1.4rem;
  }
  .description {
    display: block;
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 0.8rem;
  }
  .btn-reset {
    height: 4rem;
    text-transform: uppercase;
    font-weight: 700;
  }
`;

const schema = yup
  .object()
  .shape({
    password: yup
      .string()
      .required('Please enter your password!')
      .min(8, 'Password must be at least 8 characters long!')
      .max(32, 'Password must be less than 32 characters long!'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match!')
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const ininialValues: FormData = {
  password: '',
  passwordConfirm: ''
};

const PasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const forgotPasswordEmail = useSelector(
    (state: RootState) => state.auth.forgotPasswordEmail
  );
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: ininialValues
  });

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    if (!isValid) return;
    await resetPassword({
      email: forgotPasswordEmail,
      password: data.password
    })
      .unwrap()
      .then(() => {
        toast.success('Password updated successfully 🫡');
        navigate(AppRoute.LOGIN, { replace: true });
        reset(ininialValues);
      });
  });

  return (
    <Container
      autoComplete="off"
      onSubmit={e => {
        void onSubmit(e);
      }}
    >
      <Typography.Text className="description">
        Strong passwords include numbers, letters, and punctuation marks
      </Typography.Text>
      <MyFormItem
        containerWidth="100%"
        id="password"
        type="password"
        label={
          <Typography.Text className="field-label">
            New Password
          </Typography.Text>
        }
        control={control}
        hasError={errors.password != null}
        errorMessage={errors.password?.message}
        placeholder="Your new password"
      />
      <MyFormItem
        containerWidth="100%"
        id="passwordConfirm"
        type="password"
        label={
          <Typography.Text className="field-label">
            Confirm Password
          </Typography.Text>
        }
        control={control}
        hasError={errors.passwordConfirm != null}
        errorMessage={errors.passwordConfirm?.message}
        placeholder="Confirm your password"
      />
      <MyButton
        htmlType="submit"
        className="btn-reset"
        type="primary"
        block
        loading={isLoading}
      >
        Reset password
      </MyButton>
    </Container>
  );
};

export default PasswordForm;
