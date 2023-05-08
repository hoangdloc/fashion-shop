import styled from '@emotion/styled';
import { Typography } from 'antd';
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { MyButton } from '../../shared/components/button';
import {
  MyStandardInput,
  MyStandardTextarea
} from '../../shared/components/input';
import { fakeDelay } from '../../shared/utils/fakeDelay';
import { setShowContactPopup } from '../../store/general/generalSlice';

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

const ContactUsSection: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    await fakeDelay(3).then(() => {
      setLoading(false);
      dispatch(setShowContactPopup(true));
    });
  };

  return (
    <ContactUsSectionStyles>
      <ContactFormStyles
        onSubmit={e => {
          void handleSubmit(e);
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
          <MyStandardInput
            id="name"
            label="Your name"
            placeholder="John Doe"
            required
          />
          <MyStandardInput
            id="phone"
            label="Phone number"
            type="tel"
            pattern="\([0-9]{2}\) [0-9]{2} [0-9]{3} [0-9]{4}"
            placeholder="(84) 36 297 1924"
            required
          />
          <MyStandardInput
            id="email"
            label="Email"
            type="email"
            placeholder="youremail@gmail.com"
          />
          <MyStandardTextarea
            id="message"
            label="Send us message"
            placeholder="Type something here..."
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
