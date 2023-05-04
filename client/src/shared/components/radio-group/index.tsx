import styled from '@emotion/styled';
import React from 'react';

export interface RadioItems {
  id: string
  value: string
  label: React.ReactNode
}

interface MyRadioGroupProps extends React.ComponentProps<'input'> {
  data: RadioItems[]
  name: string
}

const MyRadioContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const MyRadioItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1.2rem;
  color: ${props => props.theme.colors.primaryBlack};
  font-size: 1.6rem;
  font-weight: 400;
  transition: color 0.3s ease-in-out;
  label {
    display: block;
    width: 100%;
    padding: 0.8rem 0;
    border-bottom: 0.1rem solid #eaeaeb;
  }
  &:last-child {
    border-bottom: none;
  }
  & > input[type='radio'] {
    display: none;
    &:checked + label {
      color: ${props => props.theme.colors.secondaryRed};
      font-weight: 700;
    }
  }
  &:hover {
    color: ${props => props.theme.colors.secondaryRed};
  }
`;

const MyRadioGroup: React.FC<MyRadioGroupProps> = ({ data, name, ...rest }) => {
  return (
    <MyRadioContainer>
      {data.map(item => (
        <MyRadioItem key={item.id}>
          <input
            type="radio"
            name={name}
            id={item.id}
            value={item.value}
            defaultChecked={item.value === data[0].value}
            {...rest}
          />
          <label htmlFor={item.id}>{item.label}</label>
        </MyRadioItem>
      ))}
    </MyRadioContainer>
  );
};

export default MyRadioGroup;
