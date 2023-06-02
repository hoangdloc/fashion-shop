import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';

interface QuantityBoxProps {
  handleSubtract?: () => void
  handlePlus?: () => void
  plusIcon?: React.ReactNode
  substractIcon?: React.ReactNode
  initialValue?: number
  substratBtnClassName?: string
  plusBtnClassName?: string
  quantityClassName?: string
  containerClassName?: string
  btnClassName?: string
  plusBtnStyle?: React.CSSProperties
  substractBtnStyle?: React.CSSProperties
  containerStyle?: React.CSSProperties
  quantityStyle?: React.CSSProperties
  btnStyle?: React.CSSProperties
}

const QuantityBoxContainer = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  border: 0.1rem solid ${props => props.theme.colors.horizontalColor};
  & > button {
    padding: 0.8rem 1.1rem;
  }
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem 2.3rem;
  }
`;

const QuantityBox: React.FC<QuantityBoxProps> = ({
  handlePlus,
  handleSubtract,
  plusIcon = '+',
  substractIcon = '-',
  initialValue = 1,
  plusBtnClassName,
  substratBtnClassName,
  quantityClassName,
  containerClassName,
  btnClassName,
  plusBtnStyle,
  substractBtnStyle,
  containerStyle,
  quantityStyle,
  btnStyle
}) => {
  return (
    <QuantityBoxContainer
      style={containerStyle}
      className={containerClassName}
    >
      <button
        className={classNames(btnClassName, substratBtnClassName)}
        onClick={handleSubtract}
        style={{ ...btnStyle, ...substractBtnStyle }}
      >
        {substractIcon}
      </button>
      <span
        className={quantityClassName}
        style={quantityStyle}
      >
        {initialValue}
      </span>
      <button
        className={classNames(btnClassName, plusBtnClassName)}
        onClick={handlePlus}
        style={{ ...btnStyle, ...plusBtnStyle }}
      >
        {plusIcon}
      </button>
    </QuantityBoxContainer>
  );
};

export default QuantityBox;
