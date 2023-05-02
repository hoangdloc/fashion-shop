import styled from '@emotion/styled';
import React from 'react';

export interface StandardInputProps extends React.ComponentProps<'input'> {
  id: string
  label: React.ReactNode
  type?: React.HTMLInputTypeAttribute
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

const StandardInputStyles = styled.input`
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
`;

const MyStandardInput: React.FC<StandardInputProps> = ({
  id,
  label,
  type = 'text',
  ...rest
}) => {
  return (
    <StandardInputContainer>
      <label htmlFor={id}>{label}</label>
      <StandardInputStyles
        id={id}
        type={type}
        {...rest}
      />
    </StandardInputContainer>
  );
};

export default MyStandardInput;
