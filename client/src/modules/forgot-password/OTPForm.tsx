import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import OTPInput from 'react-otp-input';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import OTPTimer, { type OTPTimerRefType } from './otp-timer';

import { socket } from '~/config/socket';
import { Spinner } from '~/shared/components/loader';
import { useForgotPasswordMutation } from '~/store/auth/authService';

import { type SocketServerMessage } from '~/shared/@types/socket';
import { type RootState } from '~/store/store';
import { type ShowSection } from '.';

interface OTPFormProps {
  setShowSection: React.Dispatch<React.SetStateAction<ShowSection>>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
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
  .description {
    display: block;
    font-size: 1.4rem;
    text-align: center;
  }
  .time-remain {
    display: block;
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 0.8rem;
  }
  img {
    width: 10rem;
    object-fit: cover;
    align-self: center;
  }
`;

const OTPContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
`;

const OTPForm: React.FC<OTPFormProps> = ({ setShowSection }) => {
  const emotionTheme = useTheme();
  const [otpCode, setOtpCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const forgotPasswordEmail = useSelector(
    (state: RootState) => state.auth.forgotPasswordEmail
  );
  const [forgotPassword] = useForgotPasswordMutation();
  const [otpContainer] = useAutoAnimate();
  const otpTimerRef = useRef<OTPTimerRefType>(null);

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (otpCode.length === 6 && forgotPasswordEmail != null) {
      setLoading(true);
      socket.emit('send_otp', { email: forgotPasswordEmail, otpCode });
    }
  }, [forgotPasswordEmail, otpCode]);

  useEffect(() => {
    socket.on('send_otp:error', (data: SocketServerMessage) => {
      setLoading(false);
      toast.error(data.message, {
        toastId: 'socket_error'
      });
    });

    socket.on('send_otp:success', () => {
      setLoading(false);
      setShowSection('password');
    });

    return () => {
      socket.off('send_otp:error');
      socket.off('send_otp:success');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResendBtnClick = async (): Promise<void> => {
    await forgotPassword({ email: forgotPasswordEmail })
      .unwrap()
      .then(() => otpTimerRef.current?.resetCounter());
  };

  return (
    <Container>
      <img
        src="/svg/mail-sent.svg"
        alt="Mail sent"
      />
      <Typography.Text className="description">
        Enter the OTP code we just sent to your email
      </Typography.Text>
      <Typography.Text className="time-remain">
        Time remaining: <OTPTimer ref={otpTimerRef} />
      </Typography.Text>
      <OTPContainer ref={otpContainer}>
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
        {loading && <Spinner size={20} />}
      </OTPContainer>
      <Typography.Text className="resend-otp">
        OTP not receive?{' '}
        <button
          className="resend-btn"
          onClick={() => {
            void onResendBtnClick();
          }}
        >
          Resend
        </button>
      </Typography.Text>
    </Container>
  );
};

export default OTPForm;
