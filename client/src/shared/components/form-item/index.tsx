import { CaretDownFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import isPropValid from '@emotion/is-prop-valid';
import { useTheme, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Input, Select } from 'antd';
import React, { Fragment, useRef, useState } from 'react';
import {
  Controller,
  useFormState,
  type Control,
  type FieldValues,
  type Path,
  useWatch
} from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import type { RefSelectProps, DefaultOptionType } from 'antd/es/select';

import MyCheckbox from '~/shared/components/checkbox';
import { Icon } from '../icon';
import classNames from 'classnames';
import { phoneNumberAutoFormat } from '~/shared/utils/phoneNumberAutoFormat';
import { RadioCheck } from '../radio-group';

interface MyFormItemProps<TFieldValues extends FieldValues, TContext = any> {
  id: Path<TFieldValues>
  containerWidth?: string
  label?: React.ReactNode
  placeholder?: string
  control: Control<TFieldValues, TContext>
  hasError?: boolean
  errorMessage?: React.ReactNode
  value?: string | number | readonly string[]
  type?:
  | 'text'
  | 'password'
  | 'checkbox'
  | 'select'
  | 'textarea'
  | 'phone_number'
  | 'radio'
  children?: React.ReactNode
  showSuccessStatus?: boolean
  selectBoxData?: DefaultOptionType[]
  containerClassName?: string
  onBlur?: () => void
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
    containerClassName,
    onBlur,
    value
  } = props;
  const errorRef = useRef(null);
  const successRef = useRef(null);
  const { dirtyFields } = useFormState({ control });
  const radioWatcher = useWatch({ control, name: id });
  const emotionTheme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const selectRef = useRef<RefSelectProps>(null);
  const iconRef = useRef(null);

  const onSelectLabelClick = (): void => {
    if (selectRef.current == null) return;
    selectRef.current.focus();
  };

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
                onBlur={onBlur}
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
                className="error-text"
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
                onBlur={onBlur}
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
                className="error-text"
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
                  <Icon
                    name="check"
                    width="16"
                    height="12"
                  />
                </span>
              )}
            </CSSTransition>
          )}
        </Fragment>
      )}

      {/* PHONE NUMBER */}
      {type === 'phone_number' && (
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
                onBlur={onBlur}
                onChange={e => {
                  field.onChange(phoneNumberAutoFormat(e.target.value));
                }}
                maxLength={16}
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
                className="error-text"
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
                  <Icon
                    name="check"
                    width="16"
                    height="12"
                  />
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
                onBlur={onBlur}
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
                className="error-text"
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
          <label
            htmlFor={id}
            onClick={onSelectLabelClick}
          >
            {label}
          </label>
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
                ref={selectRef}
              />
            )}
          />
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
                onBlur={onBlur}
              />
            )}
          />
        </Fragment>
      )}

      {/* RADIO */}
      {type === 'radio' && value != null && (
        <Controller
          name={id}
          control={control}
          render={({ field }) => (
            <RadioCheck
              id={id}
              checked={radioWatcher === value}
              {...field}
              onBlur={onBlur}
              value={value}
            >
              {children}
            </RadioCheck>
          )}
        />
      )}
    </MyFormItemStyles>
  );
};

export default MyFormItem;
