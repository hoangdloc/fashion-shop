import styled from '@emotion/styled';
import React from 'react';

interface StandardTextareaProps extends React.ComponentProps<'textarea'> {
  id: string
  label: React.ReactNode
}

const StandardTextareaContainer = styled.div`
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

const StandardTextareaStyles = styled.textarea`
  padding: 0.8rem 2rem;
  color: ${props => props.theme.colors.textWhite};
  background-color: transparent;
  width: 100%;
  min-height: 8.8rem;
  font-size: 1.6rem;
  font-weight: 300;
  border: none;
  border-bottom: 0.15rem solid rgba(256, 256, 256, 0.2);
  outline: none;
  resize: none;
  transition: border-bottom 0.2s ease-in-out;
  &:focus {
    border-bottom: 0.15rem solid ${props => props.theme.colors.textWhite};
  }
`;

const MyStandardTextarea: React.FC<StandardTextareaProps> = ({
  id,
  label,
  ...rest
}) => {
  return (
    <StandardTextareaContainer>
      <label htmlFor={id}>{label}</label>
      <StandardTextareaStyles
        id={id}
        {...rest}
      />
    </StandardTextareaContainer>
  );
};

export default MyStandardTextarea;
