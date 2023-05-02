import styled from '@emotion/styled';
import { Modal, Typography } from 'antd';
import React, { useState } from 'react';

import logo from '../../../assets/images/logo.png';
import MyButton from '../button';
import { useDispatch } from 'react-redux';
import { setShowContactPopup } from '../../../store/general/generalSlice';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../config/route';

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
  .ant-typography {
    text-align: center;
    margin: 0;
    &.popup-title {
      font-family: 'Playfair Display', sans-serif;
      font-weight: 700;
      font-size: 3.2rem;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      margin-bottom: 1.2rem;
    }
    &.popup-text {
      color: ${props => props.theme.colors.textSubtitle};
      font-size: 1.6rem;
      line-height: 140%;
      margin-bottom: 6rem;
    }
  }
  & > img {
    width: 5rem;
    object-fit: cover;
    margin-bottom: 1.6rem;
  }
  & > .back-to-homepage-btn {
    height: 5.2rem;
    padding: 1.5rem 6rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.6rem;
  }
`;

const ThanksPopup: React.FC<ThanksPopupProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const handleCancel = (): void => {
    setIsModalOpen(false);
    dispatch(setShowContactPopup(false));
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
