import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import { MyButton } from '~/shared/components/button';
import MyFormItem from '~/shared/components/form-item';
import { useForgotPasswordMutation } from '~/store/auth/authService';

import { type ShowSection } from '.';
import {
  resetForgotPasswordEmail,
  saveForgotPasswordEmail
} from '~/store/auth/authSlice';

interface EmailFormProps {
  setShowSection: React.Dispatch<React.SetStateAction<ShowSection>>
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  .field-label {
    font-weight: 700;
    font-size: 1.4rem;
  }
  .btn-send {
    height: 4rem;
    text-transform: uppercase;
    font-weight: 700;
  }
  .description {
    display: block;
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 0.8rem;
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

const EmailForm: React.FC<EmailFormProps> = ({ setShowSection }) => {
  const dispatch = useDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: initialValues
  });

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    if (!isValid) return;
    await forgotPassword({ email: data.email })
      .unwrap()
      .then(() => {
        dispatch(saveForgotPasswordEmail(data.email));
        setShowSection('otp');
        reset(initialValues);
      })
      .catch(() => {
        dispatch(resetForgotPasswordEmail());
      });
  });

  return (
    <FormContainer
      autoComplete="off"
      onSubmit={e => {
        void onSubmit(e);
      }}
    >
      <Typography.Text className="description">
        Enter the email address associated with your account and we&lsquo;ll
        send you an OTP code to reset your password
      </Typography.Text>
      <MyFormItem
        containerWidth="100%"
        id="email"
        label={<Typography.Text className="field-label">Email</Typography.Text>}
        control={control}
        hasError={errors.email != null}
        errorMessage={errors.email?.message}
        placeholder="Your email"
        showSuccessStatus
      />
      <MyButton
        htmlType="submit"
        className="btn-send"
        type="primary"
        block
        loading={isLoading}
      >
        Send otp code
      </MyButton>
    </FormContainer>
  );
};

export default EmailForm;
