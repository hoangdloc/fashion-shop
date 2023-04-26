import { ExclamationCircleOutlined } from '@ant-design/icons';
import isPropValid from '@emotion/is-prop-valid';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Input } from 'antd';
import React, { useRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';

interface MyFormItemProps<TFieldValues extends FieldValues, TContext = any> {
  id: Path<TFieldValues>
  containerWidth?: string
  label: React.ReactNode
  placeholder: string
  control: Control<TFieldValues, TContext>
  hasError: boolean
  errorMessage?: React.ReactNode
  type?: 'text' | 'password'
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
})((props: MyFormItemStylesProps) => ({
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
    type = 'text'
  } = props;
  const nodeRef = useRef(null);

  return (
    <MyFormItemStyles containerWidth={containerWidth}>
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
                status={hasError ? 'error' : undefined}
              />)
            : (
              <Input
                id={id}
                {...field}
                placeholder={placeholder}
                size="large"
                status={hasError ? 'error' : undefined}
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
    </MyFormItemStyles>
  );
};

export default MyFormItem;
