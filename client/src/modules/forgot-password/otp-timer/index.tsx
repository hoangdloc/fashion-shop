import styled from '@emotion/styled';
import React, { useEffect, useImperativeHandle, useState } from 'react';

export interface OTPTimerRefType {
  resetCounter: () => void
}

const OTPTimerStyles = styled.time`
  font-weight: 700;
`;

const OTPTimer = React.forwardRef((_, ref) => {
  const [counter, setCounter] = useState<number>(60);

  useImperativeHandle(ref, () => {
    return {
      resetCounter: () => {
        setCounter(60);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);
    if (counter === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  const formatTimer = (counter: number): string => {
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return <OTPTimerStyles>{formatTimer(counter)}</OTPTimerStyles>;
});

OTPTimer.displayName = 'OTPTimer';

export default OTPTimer;
