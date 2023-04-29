import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';

import { CheckIcon } from '../icon';

interface MyCheckboxProps extends React.ComponentPropsWithRef<'input'> {
  children?: React.ReactNode
}

const MyCheckBoxStyles = styled('label')`
  display: inline-block;
  cursor: pointer;
  input[type='checkbox'] {
    display: none;
    &:checked + .my-checkbox .my-checkbox-square .check-icon {
      visibility: visible;
      opacity: 1;
    }
  }
  .my-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.1rem 1rem 0.1rem 0;
    .my-checkbox-square {
      width: 2rem;
      height: 2rem;
      min-height: 2rem;
      min-width: 2rem;
      border: 0.1rem solid ${props => props.theme.colors.horizontalColor};
      display: flex;
      align-items: center;
      justify-content: center;
      & > .check-icon {
        visibility: hidden;
        opacity: 0;
        transition: all 0.1s ease-in-out;
      }
    }
    .checkbox-label {
      font-family: inherit;
      color: ${props => props.theme.colors.textSubtitle};
      font-size: 1.4rem;
      font-weight: 400;
      user-select: none;
    }
  }
`;

const MyCheckbox = React.forwardRef<HTMLInputElement, MyCheckboxProps>(({ children, ...rest }, ref) => {
  return (
    <MyCheckBoxStyles>
      <input
        type="checkbox"
        ref={ref}
        {...rest}
      />
      <div className="my-checkbox">
        <div className="my-checkbox-square">
          <span className="check-icon">
            <CheckIcon />
          </span>
        </div>
        <Typography.Text className="checkbox-label">{children}</Typography.Text>
      </div>
    </MyCheckBoxStyles>
  );
});

MyCheckbox.displayName = 'MyCheckbox';

export default MyCheckbox;
