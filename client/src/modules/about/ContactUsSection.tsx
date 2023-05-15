import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { MyButton } from '~/shared/components/button';
import { MyStandardInput, MyStandardTextarea } from '~/shared/components/input';
import { useFakeLoading } from '~/shared/hooks/useFakeLoading';
import { phoneNumberAutoFormat } from '~/shared/utils/phoneNumberAutoFormat';
import { setShowContactPopup } from '~/store/general/generalSlice';

const ContactUsSectionStyles = styled.section`
  height: 72rem;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
    url('/img/contact-us.png');
  background-size: cover;
  display: flex;
  justify-content: end;
`;

const ContactFormStyles = styled.form`
  width: calc(100vw / 2 - 0.8rem);
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 6rem 16rem 6rem 4rem;
  .ant-typography {
    color: ${props => props.theme.colors.textWhite};
    margin: 0;
    &.contact-title {
      font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
      font-weight: 700;
      font-size: 3.2rem;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      margin-bottom: 0.8rem;
      line-height: 4.3rem;
    }
    &.contact-subtitle {
      font-weight: 300;
      font-size: 1.6rem;
      color: rgba(256, 256, 256, 0.8);
    }
  }
  .send-btn {
    margin-top: 4rem;
    background-color: transparent;
    padding: 1.5rem 2.7rem;
    height: 5.2rem;
    color: ${props => props.theme.colors.textWhite};
    font-size: 1.6rem;
    font-weight: 700;
    text-transform: uppercase;
    &:hover {
      background-color: ${props => props.theme.colors.textWhite};
      border-color: ${props => props.theme.colors.textWhite};
    }
  }
`;

const ContactFormFieldsContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const schema = yup.object().shape({
  name: yup.string().required('Please enter your name!'),
  phone: yup
    .string()
    .required('Please enter your phone number!')
    .min(16, 'Invalid phone number!')
    .max(16, 'Invalid phone number!'),
  email: yup
    .string()
    .email('Please enter valid email!')
    .required('Please enter your email!'),
  note: yup.string()
});
type FormData = yup.InferType<typeof schema>;

const initialValues: FormData = {
  name: '',
  phone: '',
  email: '',
  note: ''
};

const ContactUsSection: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, fakeLoading } = useFakeLoading();

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

  const onSubmit = handleSubmit(async (_, event) => {
    event?.preventDefault();
    if (!isValid) return;
    await fakeLoading();
    dispatch(setShowContactPopup(true));
    reset(initialValues);
  });

  return (
    <ContactUsSectionStyles>
      <ContactFormStyles
        onSubmit={e => {
          void onSubmit(e);
        }}
        autoComplete="off"
      >
        <Typography.Title className="contact-title">
          Contact us
        </Typography.Title>
        <Typography.Text className="contact-subtitle">
          Leave a request when you need our help. Don&lsquo;t forget to check
          your phone and email for the earliest reply from the store. Best
          regards!
        </Typography.Text>
        <ContactFormFieldsContainer>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <MyStandardInput
                id="name"
                label="Your name"
                placeholder="John Doe"
                status={errors.name != null ? 'error' : undefined}
                {...field}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <MyStandardInput
                id="phone"
                label="Phone number"
                type="tel"
                placeholder="(84) 36 297 1924"
                status={errors.phone != null ? 'error' : undefined}
                {...field}
                onChange={e => {
                  field.onChange(phoneNumberAutoFormat(e.target.value));
                }}
                maxLength={16}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <MyStandardInput
                id="email"
                label="Email"
                type="email"
                placeholder="youremail@gmail.com"
                status={errors.email != null ? 'error' : undefined}
                {...field}
              />
            )}
          />
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <MyStandardTextarea
                id="message"
                label="Send us message"
                placeholder="Type something here..."
                {...field}
              />
            )}
          />
        </ContactFormFieldsContainer>
        <MyButton
          htmlType="submit"
          className="send-btn"
          loading={loading}
        >
          Send message
        </MyButton>
      </ContactFormStyles>
    </ContactUsSectionStyles>
  );
};

export default ContactUsSection;
