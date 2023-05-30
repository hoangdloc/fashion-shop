import styled from '@emotion/styled';
import { Modal, Typography } from 'antd';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '~/assets/images/logo.png';
import { AppRoute } from '~/config/route';
import { MyButton } from '~/shared/components/button';
import {
  setShowContactPopup,
  setShowOrderingPopup
} from '~/store/general/generalSlice';

import { type RootState } from '~/store/store';

interface ThanksPopupProps {
  children?: React.ReactNode
}

const ThanksPopupStyles = styled(Modal)`
  .ant-modal-content {
    padding: 0;
    min-height: 46rem;
    & > .ant-modal-body {
      height: 100%;
    }
    @media ${props => props.theme.devices.mobile} {
      min-height: 32rem;
    }
  }
`;

const PopupContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 8rem 11.6rem 6rem 11.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${props => props.theme.devices.mobile} {
    padding: 4rem 2.4rem 3rem 2.4rem;
  }
  .ant-typography {
    text-align: center;
    margin: 0;
    &.popup-title {
      font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
      font-weight: 700;
      font-size: 3.2rem;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      margin-bottom: 1.2rem;
      @media ${props => props.theme.devices.mobile} {
        font-size: 2rem;
      }
    }
    &.popup-text {
      color: ${props => props.theme.colors.textSubtitle};
      font-size: 1.6rem;
      line-height: 140%;
      margin-bottom: 6rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      & > * {
        margin: 0;
      }
      @media ${props => props.theme.devices.mobile} {
        font-size: 1.4rem;
        margin-bottom: 3rem;
      }
    }
  }
  & > img {
    width: 5rem;
    object-fit: cover;
    margin-bottom: 1.6rem;
    @media ${props => props.theme.devices.mobile} {
      width: 4.8rem;
    }
  }
  & > .back-to-homepage-btn {
    height: 5.2rem;
    padding: 1.5rem 6rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.6rem;
    @media ${props => props.theme.devices.mobile} {
      height: 4rem;
      font-size: 1.4rem;
    }
  }
`;

const ThanksPopup: React.FC<ThanksPopupProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const showContactPopup = useSelector(
    (state: RootState) => state.general.showContactPopup
  );
  const showOrderingPopup = useSelector(
    (state: RootState) => state.general.showOrderingPopup
  );

  const handleCancel = (): void => {
    setIsModalOpen(false);
    if (showContactPopup) {
      dispatch(setShowContactPopup(false));
    }
    if (showOrderingPopup) {
      dispatch(setShowOrderingPopup(false));
    }
  };

  const handleClickBackToHomepage = (): void => {
    handleCancel();
    navigate(AppRoute.HOME);
  };

  return (
    <ThanksPopupStyles
      width="74.2rem"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      closable={false}
    >
      <PopupContainer>
        <img
          src={logo}
          alt="Fashion Logo"
        />
        <Typography.Title className="popup-title">Thank you!</Typography.Title>
        <Typography.Text className="popup-text">{children}</Typography.Text>
        <MyButton
          type="primary"
          className="back-to-homepage-btn"
          onClick={handleClickBackToHomepage}
        >
          Back to homepage
        </MyButton>
      </PopupContainer>
    </ThanksPopupStyles>
  );
};

export default ThanksPopup;
