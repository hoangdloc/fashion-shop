import styled from '@emotion/styled';
import React from 'react';

export interface StandardInputProps extends React.ComponentProps<'input'> {
  id: string
  label: React.ReactNode
  type?: React.HTMLInputTypeAttribute
  status?: 'normal' | 'error'
}

const StandardInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  & > label {
    color: ${props => props.theme.colors.textWhite};
    font-size: 1.6rem;
    width: fit-content;
  }
`;

const StandardInputStyles = styled.input<Pick<StandardInputProps, 'status'>>`
  padding: 0.8rem 2rem;
  color: ${props => props.theme.colors.textWhite};
  background-color: transparent;
  width: 100%;
  font-size: 1.6rem;
  font-weight: 300;
  border: none;
  border-bottom: 0.15rem solid rgba(256, 256, 256, 0.2);
  outline: none;
  transition: border-bottom 0.2s ease-in-out;
  &:focus {
    border-bottom: 0.15rem solid ${props => props.theme.colors.textWhite};
  }
  ${props =>
    props.status === 'error' && {
      color: 'rgb(255, 77, 79, 0.4)',
      borderBottom: '0.15rem solid rgba(255, 77, 79, 0.4)',
      '&::placeholder, &:-ms-input-placeholder, &::-ms-input-placeholder': {
        color: 'rgb(255, 77, 79, 0.4)'
      },
      '&:focus': {
        color: 'rgb(255, 77, 79)',
        borderBottom: '0.15rem solid rgba(255, 77, 79)'
      }
    }};
`;

const MyStandardInput = React.forwardRef<HTMLInputElement, StandardInputProps>(
  ({ id, label, type = 'text', status = 'normal', ...rest }, ref) => {
    return (
      <StandardInputContainer>
        <label htmlFor={id}>{label}</label>
        <StandardInputStyles
          id={id}
          type={type}
          status={status}
          {...rest}
        />
      </StandardInputContainer>
    );
  }
);

MyStandardInput.displayName = 'MyStandardInput';

export default MyStandardInput;
