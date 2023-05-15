import styled from '@emotion/styled';
import React from 'react';

import { type RadioItems } from '.';

interface MyRadioGroupProps
  extends Omit<React.ComponentProps<'input'>, 'type' | 'defaultChecked'> {
  data: RadioItems[]
  name: string
  direction?: 'vertical' | 'horizontal'
  underline?: boolean
  type?: 'text' | 'box'
  selectedStyle?: React.CSSProperties
  hoverStyle?: React.CSSProperties
  defaultCheckedRadio?: string | number
  checkedRadio?: string | number
}

const MyRadioContainer = styled.div<Pick<MyRadioGroupProps, 'direction'>>`
  width: 100%;
  display: flex;
  flex-direction: ${props =>
    props.direction === 'vertical' ? 'column' : 'row'};
  gap: ${props => (props.direction === 'vertical' ? '1.6rem' : '1.2rem')};
`;

const MyRadioItem = styled.div<
Pick<
MyRadioGroupProps,
'underline' | 'direction' | 'type' | 'selectedStyle' | 'hoverStyle'
>
>`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1.2rem;
  color: ${props => props.theme.colors.primaryBlack};
  font-size: 1.6rem;
  font-weight: 400;
  transition: color 0.3s ease-in-out;
  border-bottom: ${props =>
    props.underline ?? false ? '0.1rem solid #eaeaeb' : 'none'};
  label {
    display: ${props =>
    props.direction === 'vertical' ? 'block' : 'inline-block'};
    width: 100%;
    padding: ${props => (props.direction === 'vertical' ? '0.8rem 0' : 0)};
  }
  &:last-child {
    border-bottom: none;
  }
  & > input[type='radio'] {
    display: none;
    &:checked + label {
      ${props =>
    props.type === 'text'
      ? {
        color: props.theme.colors.secondaryRed,
        fontWeight: 700
      }
      : {
        '& > *': {
          transition: 'all 0.2s ease-in-out',
          ...props.selectedStyle
        }
      }};
    }
  }
  &:hover {
    ${props =>
    props.type === 'text'
      ? {
        color: props.theme.colors.secondaryRed
      }
      : {
        '& label > *': {
          ...props.hoverStyle
        }
      }};
  }
`;

const MyRadioGroup: React.FC<MyRadioGroupProps> = ({
  data,
  name,
  direction = 'vertical',
  underline = false,
  type = 'text',
  selectedStyle = {},
  hoverStyle = {},
  defaultCheckedRadio,
  checkedRadio,
  ...rest
}) => {
  return (
    <MyRadioContainer direction={direction}>
      {data.map(item => (
        <MyRadioItem
          key={item.id}
          underline={underline}
          direction={direction}
          type={type}
          selectedStyle={selectedStyle}
          hoverStyle={hoverStyle}
        >
          <input
            type="radio"
            name={name}
            id={item.id}
            value={item.value}
            defaultChecked={
              defaultCheckedRadio != null
                ? item.value === defaultCheckedRadio
                : undefined
            }
            checked={
              checkedRadio != null
                ? item.value === checkedRadio
                : undefined
            }
            {...rest}
          />
          <label htmlFor={item.id}>{item.label}</label>
        </MyRadioItem>
      ))}
    </MyRadioContainer>
  );
};

export default MyRadioGroup;
