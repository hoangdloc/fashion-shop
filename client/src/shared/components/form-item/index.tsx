import { ExclamationCircleOutlined } from '@ant-design/icons';
import isPropValid from '@emotion/is-prop-valid';
import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Input } from 'antd';
import React, { Fragment, useRef } from 'react';
import
{
  Controller,
  type Control,
  type FieldValues,
  type Path
} from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';

import MyCheckbox from '~/shared/components/checkbox';

interface MyFormItemProps<TFieldValues extends FieldValues, TContext = any> {
  id: Path<TFieldValues>
  containerWidth?: string
  label?: React.ReactNode
  placeholder?: string
  control: Control<TFieldValues, TContext>
  hasError?: boolean
  errorMessage?: React.ReactNode
  type?: 'text' | 'password' | 'checkbox'
  children?: React.ReactNode
}

type MyFormItemStylesProps = Partial<Theme> &
Pick<MyFormItemProps<FieldValues>, 'containerWidth'> &
React.HTMLAttributes<HTMLDivElement> &
React.ClassAttributes<HTMLDivElement>;

const duration = 300;

const defaultErrorStyles = {
  transition: `all ${duration}ms ease-in-out`,
  top: '110%'
};

const transitionErrorStyle = {
  entering: { top: '110%', opacity: 1 },
  entered: { top: '110%', opacity: 1 },
  exiting: { top: '102%', opacity: 0 },
  exited: { top: '102%', opacity: 0 },
  unmounted: { top: '100%', opacity: 0 }
};

const MyFormItemStyles = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'containerWidth'
})<MyFormItemStylesProps>(props => ({
  width: props.containerWidth,
  fontSize: '1.6rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  alignItems: 'flex-start',
  justifyContent: 'center',
  marginBottom: '2.4rem',
  position: 'relative'
}));

const MyFormItem = <T extends FieldValues>(
  props: MyFormItemProps<T>
): JSX.Element => {
  const {
    containerWidth = '32.1rem',
    id,
    label,
    placeholder,
    control,
    hasError,
    errorMessage,
    type = 'text',
    children
  } = props;
  const nodeRef = useRef(null);

  return (
    <MyFormItemStyles containerWidth={containerWidth}>
      {type === 'checkbox'
        ? (
          <Controller
            name={id}
            control={control}
            render={({ field }) => <MyCheckbox {...field}>{children}</MyCheckbox>}
          />)
        : (
          <Fragment>
            <label htmlFor={id}>{label}</label>
            <Controller
              name={id}
              control={control}
              render={({ field }) =>
                type === 'password'
                  ? (
                    <Input.Password
                      id={id}
                      {...field}
                      placeholder={placeholder}
                      size="large"
                      status={hasError === true ? 'error' : undefined}
                    />)
                  : (
                    <Input
                      id={id}
                      {...field}
                      placeholder={placeholder}
                      size="large"
                      status={hasError === true ? 'error' : undefined}
                    />)
              }
            />
            <CSSTransition
              ref={nodeRef}
              in={hasError}
              timeout={duration}
              unmountOnExit
            >
              {state => (
                <p
                  style={{
                    ...defaultErrorStyles,
                    ...transitionErrorStyle[state],
                    color: '#ff4d4f',
                    fontSize: '1.2rem',
                    position: 'absolute'
                  }}
                  ref={nodeRef}
                >
                  <ExclamationCircleOutlined /> {errorMessage}
                </p>
              )}
            </CSSTransition>
          </Fragment>)}
    </MyFormItemStyles>
  );
};

export default MyFormItem;
