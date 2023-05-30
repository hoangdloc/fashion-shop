import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';

import { Icon } from '~/shared/components/icon';

interface RadioCheckProps extends React.ComponentPropsWithRef<'input'> {
  children?: React.ReactNode
}

const RadioCheckStyles = styled('label')`
  display: inline-block;
  cursor: pointer;
  input[type='radio'] {
    display: none;
    &:checked + .my-radio .my-radio-square .check-icon {
      visibility: visible;
      opacity: 1;
    }
  }
  .my-radio {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.1rem 1rem 0.1rem 0;
    .my-radio-square {
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
    .radio-label {
      font-family: inherit;
      color: ${props => props.theme.colors.textSubtitle};
      font-size: 1.4rem;
      font-weight: 400;
      user-select: none;
    }
  }
`;

const RadioCheck = React.forwardRef<HTMLInputElement, RadioCheckProps>(
  ({ children, ...rest }, ref) => {
    return (
      <RadioCheckStyles>
        <input
          type="radio"
          ref={ref}
          {...rest}
        />
        <div className="my-radio">
          <div className="my-radio-square">
            <span className="check-icon">
              <Icon
                name="check"
                width="12"
                height="10"
              />
            </span>
          </div>
          <Typography.Text className="radio-label">{children}</Typography.Text>
        </div>
      </RadioCheckStyles>
    );
  }
);

RadioCheck.displayName = 'RadioCheck';

export default RadioCheck;
