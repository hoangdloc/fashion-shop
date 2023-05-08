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
    min-height: 40rem;
    & > .ant-modal-body {
      height: 100%;
      & > .popup-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        height: 100%;
        .subcribe-box {
          padding: 8rem 2rem;
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
        img {
          width: 100%;
          height: 40rem;
          object-fit: cover;
        }
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
          src={subcribeImg}
          alt="A desk with some tools"
        />
      </div>
    </SubcribePopupStyles>
  );
};

export default SubcribePopup;
