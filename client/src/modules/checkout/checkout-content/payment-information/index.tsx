import styled from '@emotion/styled';
import type { DefaultOptionType } from 'antd/es/select';
import React, { useRef, useState } from 'react';
import { ConfigProvider, Select } from 'antd';
import { PaymentMethod } from '~/shared/@types/payment';
import { ArticleHeading } from '~/shared/components/heading';
import { useTheme } from '@emotion/react';
import { CaretDownFilled } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';

const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.textWhite};
  padding: 3.2rem 4rem;
  box-shadow: 0px 10.786210060119629px 18.783418655395508px 0px #00000009,
    0px 47px 113px 0px #00000012;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.7rem;
  @media ${props => props.theme.devices.mobile} {
    padding: 2.4rem 1.6rem;
  }
  & .ant-select {
    & .ant-select-selector {
      & .ant-select-selection-item {
        font-size: 1.4rem;
        color: ${props => props.theme.colors.textSubtitle};
      }
    }
  }
`;

const duration = 300;

const defaultCaretDownFilledStyle = {
  transition: `transform ${duration}ms ease-in-out`,
  transform: 'rotate(0)'
};

const transitionCaretDownFilledStyles = {
  entering: { transform: 'rotate(180deg)' },
  entered: { transform: 'rotate(180deg)' },
  exiting: { transform: 'rotate(0)' },
  exited: { transform: 'rotate(0)' },
  unmounted: { transform: 'rotate(0)' }
};

const paymentOptions: DefaultOptionType[] = [
  { value: PaymentMethod.COD, label: 'Payment by cash when received' },
  { value: PaymentMethod.CREDIT, label: 'Payment by credit card' },
  { value: PaymentMethod.DEBIT, label: 'Payment by debit card' }
];

const PaymentInformation: React.FC = () => {
  const emotionTheme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const iconRef = useRef(null);

  const onDropdownVisibleChange = (open: boolean): void => {
    setOpen(open);
  };

  return (
    <Container>
      <ArticleHeading level="h3">Payment information</ArticleHeading>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: emotionTheme.colors.secondaryRed
          }
        }}
      >
        <Select
          size="large"
          defaultValue={PaymentMethod.COD}
          options={paymentOptions}
          dropdownStyle={{ padding: 0 }}
          onDropdownVisibleChange={onDropdownVisibleChange}
          suffixIcon={
            <CSSTransition
              ref={iconRef}
              in={open}
              timeout={duration}
            >
              {state => (
                <CaretDownFilled
                  style={{
                    ...defaultCaretDownFilledStyle,
                    ...transitionCaretDownFilledStyles[state],
                    color: emotionTheme.colors.textSubtitle,
                    fontSize: 16
                  }}
                  ref={iconRef}
                />
              )}
            </CSSTransition>
          }
        />
      </ConfigProvider>
    </Container>
  );
};

export default PaymentInformation;
