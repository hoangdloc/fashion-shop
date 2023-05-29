import styled from '@emotion/styled';
import { Modal, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import subcribeImg from '~/assets/images/subcribe.png';
import { MyButton } from '~/shared/components/button';
import MyCheckbox from '~/shared/components/checkbox';
import { CloseIcon } from '~/shared/components/icon';
import { MyOutlinedInput } from '~/shared/components/input';
import { useFakeLoading } from '~/shared/hooks/useFakeLoading';
import { toggleShowPopupAgain } from '~/store/general/generalSlice';
import type { RootState } from '~/store/store';

const SubcribePopupStyles = styled(Modal)`
  .ant-modal-content {
    padding: 0;
    height: 40rem;
    @media ${props => props.theme.devices.mobile} {
      height: 68rem;
    }
    & > .ant-modal-body {
      height: 100%;
      & > .popup-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        height: 100%;
        @media ${props => props.theme.devices.mobile} {
          grid-template-columns: 1fr;
        }
        .subcribe-box {
          padding: 8rem 2rem;
          @media ${props => props.theme.devices.mobile} {
            padding: 2.8rem 2.4rem 6rem 2.4rem;
            height: 29.6rem;
          }
          .title {
            font-size: 2.4rem;
            font-family: ${props => props.theme.fontFamily.PlayfairDisplay};
            font-weight: 700;
            width: 29.5rem;
            line-height: 3.36rem;
            text-transform: uppercase;
            margin-bottom: 1.6rem;
            p {
              margin: 0;
            }
          }
          .subtitle {
            font-size: 1.6rem;
            font-weight: 300;
            line-height: 2.24rem;
          }
          .email-form {
            margin-top: 4rem;
            margin-bottom: 1.2rem;
            display: flex;
            max-width: 34.1rem;
            .email-input {
              height: 4rem;
              font-size: 1.4rem;
              padding: 1rem 1.2rem;
              border: 0.15rem solid ${props => props.theme.colors.primaryBlack};
            }
            .btn-submit {
              height: 4rem;
              font-size: 1.4rem;
              font-weight: 700;
              padding: 1rem 1.6rem;
              border: none;
            }
          }
        }
        .subcribe-img {
          width: 100%;
          height: 40rem;
          object-fit: cover;
          @media ${props => props.theme.devices.mobile} {
            height: calc(68rem - 29.6rem);
          }
        }
      }
    }
    & > .ant-modal-close {
      color: ${props => props.theme.colors.textWhite};
      @media ${props => props.theme.devices.mobile} {
        color: ${props => props.theme.colors.horizontalColor};
      }
    }
  }
`;

const SubcribePopup: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const showSubcribePopupAgain = useSelector(
    (state: RootState) => state.general.showSubcribePopupAgain
  );
  const { loading, fakeLoading } = useFakeLoading();
  const dispatch = useDispatch();
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleCancel = (): void => {
    setIsModalOpen(false);
    dispatch(toggleShowPopupAgain(!(checkboxRef.current?.checked ?? false)));
  };

  if (!showSubcribePopupAgain) return null;

  return (
    <SubcribePopupStyles
      width="74.2rem"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      closeIcon={<CloseIcon />}
    >
      <div className="popup-container">
        <div className="subcribe-box">
          <Typography.Title className="title">
            <p>Subcribe</p> and get newsletter
          </Typography.Title>
          <Typography.Text className="subtitle">
            Subcrise and get new our collection.
          </Typography.Text>
          <form className="email-form">
            <MyOutlinedInput
              className="email-input"
              placeholder="youremail.@gmail.com"
              placeholderColor="#55595B"
            />
            <MyButton
              className="btn-submit"
              onClick={() => {
                void fakeLoading();
              }}
              loading={loading}
              type="primary"
            >
              Submit
            </MyButton>
          </form>
          <MyCheckbox ref={checkboxRef}>
            <Typography.Text style={{ color: '#949697' }}>
              Do not show this popup again
            </Typography.Text>
          </MyCheckbox>
        </div>
        <img
          className="subcribe-img"
          src={subcribeImg}
          alt="A desk with some tools"
        />
      </div>
    </SubcribePopupStyles>
  );
};

export default SubcribePopup;
