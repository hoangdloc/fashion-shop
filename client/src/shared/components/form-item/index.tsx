import { CaretDownFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import isPropValid from '@emotion/is-prop-valid';
import { useTheme, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { ConfigProvider, Input, Select } from 'antd';
import React, { Fragment, useRef, useState } from 'react';
import {
  Controller,
  useFormState,
  type Control,
  type FieldValues,
  type Path
} from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import { type DefaultOptionType } from 'antd/es/select';

import MyCheckbox from '~/shared/components/checkbox';
import { CheckIcon } from '../icon';
import classNames from 'classnames';

interface MyFormItemProps<TFieldValues extends FieldValues, TContext = any> {
  id: Path<TFieldValues>
  containerWidth?: string
  label?: React.ReactNode
  placeholder?: string
  control: Control<TFieldValues, TContext>
  hasError?: boolean
  errorMessage?: React.ReactNode
  type?: 'text' | 'password' | 'checkbox' | 'select' | 'textarea'
  children?: React.ReactNode
  showSuccessStatus?: boolean
  selectBoxData?: DefaultOptionType[]
  containerClassName?: string
}

type MyFormItemStylesProps = Partial<Theme> &
Pick<MyFormItemProps<FieldValues>, 'containerWidth'> &
React.HTMLAttributes<HTMLDivElement> &
React.ClassAttributes<HTMLDivElement>;

const duration = 300;

const defaultErrorStyles = {
  transition: `all ${duration}ms ease-in-out`,
  top: '110%',
  fontSize: '1.2rem',
  width: 'max-content'
};

const transitionErrorStyle = {
  entering: { top: '110%', opacity: 1 },
  entered: { top: '110%', opacity: 1 },
  exiting: { top: '102%', opacity: 0 },
  exited: { top: '102%', opacity: 0 },
  unmounted: { top: '100%', opacity: 0 }
};

const defaultSuccessStyles = {
  transition: `all ${duration}ms ease-in-out`,
  right: '1.2rem',
  transform: 'translateY(-50%)',
  top: '72%'
};

const transitionSuccessStyles = {
  entering: { top: '72%', opacity: 1 },
  entered: { top: '72%%', opacity: 1 },
  exiting: { top: '90%', opacity: 0 },
  exited: { top: '90%', opacity: 0 },
  unmounted: { top: '90%', opacity: 0 }
};

const defaultCaretDownFilledStyle = {
  transition: `transform ${duration}ms ease-in-out`,
  transform: 'rotate(0)'
};

const transitionCaretDownFilledStyles = {
  entering: { transform: 'rotate(180deg)' },
  entered: { transform: 'rotate(180deg)' },
  exiting: { transform: 'rotate(0)' },
  exited: { transform: 'rotate(0)' },
  unmounted: { transform: 'rotate(0)' }
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
  position: 'relative',
  '& .ant-select': {
    '& .ant-select-selector': {
      '& .ant-select-selection-item': {
        fontSize: '1.8rem',
        color: props.theme.colors.textSubtitle
      }
    }
  }
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
    children,
    showSuccessStatus = false,
    selectBoxData,
    containerClassName
  } = props;
  const errorRef = useRef(null);
  const successRef = useRef(null);
  const { dirtyFields } = useFormState({ control });
  const emotionTheme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const iconRef = useRef(null);

  const onDropdownVisibleChange = (open: boolean): void => {
    setOpen(open);
  };

  return (
    <MyFormItemStyles
      className={classNames('my-form-item', containerClassName)}
      containerWidth={containerWidth}
    >
      {/* CHECKBOX */}
      {type === 'checkbox' && (
        <Fragment>
          <Controller
            name={id}
            control={control}
            render={({ field }) => (
              <MyCheckbox
                id={id}
                checked={field.value}
                {...field}
              >
                {children}
              </MyCheckbox>
            )}
          />
          <CSSTransition
            ref={errorRef}
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
                  position: 'absolute'
                }}
                ref={errorRef}
              >
                <ExclamationCircleOutlined /> {errorMessage}
              </p>
            )}
          </CSSTransition>
        </Fragment>
      )}

      {/* TEXT */}
      {type === 'text' && (
        <Fragment>
          <label htmlFor={id}>{label}</label>
          <Controller
            name={id}
            control={control}
            render={({ field }) => (
              <Input
                id={id}
                {...field}
                placeholder={placeholder}
                size="large"
                status={hasError === true ? 'error' : undefined}
              />
            )}
          />
          <CSSTransition
            ref={errorRef}
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
                  position: 'absolute'
                }}
                ref={errorRef}
              >
                <ExclamationCircleOutlined /> {errorMessage}
              </p>
            )}
          </CSSTransition>
          {showSuccessStatus && (
            <CSSTransition
              ref={successRef}
              in={hasError === false && dirtyFields[id]}
              timeout={duration}
              unmountOnExit
            >
              {state => (
                <span
                  style={{
                    ...defaultSuccessStyles,
                    ...transitionSuccessStyles[state],
                    position: 'absolute'
                  }}
                  ref={successRef}
                >
                  <CheckIcon size="medium" />
                </span>
              )}
            </CSSTransition>
          )}
        </Fragment>
      )}

      {/* PASSWORD */}
      {type === 'password' && (
        <Fragment>
          <label htmlFor={id}>{label}</label>
          <Controller
            name={id}
            control={control}
            render={({ field }) => (
              <Input.Password
                id={id}
                {...field}
                placeholder={placeholder}
                size="large"
                status={hasError === true ? 'error' : undefined}
              />
            )}
          />
          <CSSTransition
            ref={errorRef}
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
                  position: 'absolute'
                }}
                ref={errorRef}
              >
                <ExclamationCircleOutlined /> {errorMessage}
              </p>
            )}
          </CSSTransition>
        </Fragment>
      )}

      {/* SELECT */}
      {type === 'select' && selectBoxData != null && (
        <Fragment>
          <label htmlFor={id}>{label}</label>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: emotionTheme.colors.secondaryRed
              }
            }}
          >
            <Controller
              name={id}
              control={control}
              render={({ field }) => (
                <Select
                  size="large"
                  defaultValue={selectBoxData[0].value}
                  options={selectBoxData}
                  dropdownStyle={{ padding: 0 }}
                  onDropdownVisibleChange={onDropdownVisibleChange}
                  suffixIcon={
                    <CSSTransition
                      ref={iconRef}
                      in={open}
                      timeout={duration}
                    >
                      {state => (
                        <CaretDownFilled
                          style={{
                            ...defaultCaretDownFilledStyle,
                            ...transitionCaretDownFilledStyles[state],
                            color: emotionTheme.colors.textSubtitle,
                            fontSize: 16
                          }}
                          ref={iconRef}
                        />
                      )}
                    </CSSTransition>
                  }
                  style={{ width: '100%' }}
                  {...field}
                />
              )}
            />
          </ConfigProvider>
        </Fragment>
      )}

      {/* TEXTAREA */}
      {type === 'textarea' && (
        <Fragment>
          <label htmlFor={id}>{label}</label>
          <Controller
            name={id}
            control={control}
            render={({ field }) => (
              <Input.TextArea
                id={id}
                {...field}
                placeholder={placeholder}
                size="large"
                style={{ resize: 'none', height: '8rem' }}
              />
            )}
          />
        </Fragment>
      )}
    </MyFormItemStyles>
  );
};

export default MyFormItem;
