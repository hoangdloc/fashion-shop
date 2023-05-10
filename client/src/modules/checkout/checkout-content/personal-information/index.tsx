import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import type { DefaultOptionType } from 'antd/es/select';

import MyFormItem from '~/shared/components/form-item';
import { ArticleHeading } from '~/shared/components/heading';

const Container = styled.div`
  background-color: ${props => props.theme.colors.textWhite};
  box-shadow: 0px 10.786210060119629px 18.783418655395508px 0px #00000009,
    0px 47px 113px 0px #00000012;
  padding: 3.2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.7rem;
`;

const PersonalInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  .field-label {
    font-weight: 700;
    font-size: 1.6rem;
  }
  .my-form-item {
    margin: 0;
  }
`;

const GroupFormItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const GroupCheckbox = styled.div`
  display: flex;
  align-items: start;
  gap: 3rem;
`;

const schema = yup
  .object()
  .shape({
    fullname: yup.string().required('Please enter your full name!'),
    phoneNumber: yup
      .string()
      .required('Please enter your phone number')
      .matches(/^\d+$/, 'Phone number should have digits only!')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits'),
    city: yup.string().required('Please enter city name!'),
    zipCode: yup
      .string()
      .required('Please enter zip code')
      .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, 'Invalid zip code!'),
    address: yup.string().required('Please enter your address!'),
    deliveryType: yup.string().default('Home').oneOf(['Home', 'Office']),
    deliveryTime: yup.bool().oneOf([true]).required('Must have at least one delivery time!'),
    note: yup.string()
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const initialValues: FormData = {
  fullname: '',
  phoneNumber: '',
  city: '',
  zipCode: '',
  address: '',
  deliveryType: 'Home',
  deliveryTime: false,
  note: ''
};

const selectDeliveryType: DefaultOptionType[] = [
  { value: 'Home', label: 'Home' },
  { value: 'Office', label: 'Office' }
];

const PersonalInformation: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: initialValues
  });

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    if (!isValid) return;
    console.log(data);
  });

  return (
    <Container>
      <ArticleHeading>Your information</ArticleHeading>
      <PersonalInfoForm
        id="checkout-form"
        onSubmit={e => {
          void onSubmit(e);
        }}
      >
        <GroupFormItems>
          <MyFormItem
            id="fullname"
            control={control}
            placeholder="J. Seraphine"
            label={
              <Typography.Text className="field-label">Name</Typography.Text>
            }
            hasError={errors.fullname != null}
            errorMessage={errors.fullname?.message}
            containerWidth="100%"
            showSuccessStatus
          />
          <MyFormItem
            id="phoneNumber"
            control={control}
            placeholder="(84) 36 297 1924"
            label={
              <Typography.Text className="field-label">
                Phone number
              </Typography.Text>
            }
            hasError={errors.phoneNumber != null}
            errorMessage={errors.phoneNumber?.message}
            containerWidth="100%"
            showSuccessStatus
          />
        </GroupFormItems>
        <GroupFormItems>
          <MyFormItem
            id="city"
            control={control}
            placeholder="London"
            label={
              <Typography.Text className="field-label">City</Typography.Text>
            }
            hasError={errors.city != null}
            errorMessage={errors.city?.message}
            containerWidth="100%"
            showSuccessStatus
          />
          <MyFormItem
            id="zipCode"
            control={control}
            placeholder="M-7051"
            label={
              <Typography.Text className="field-label">
                Zip code
              </Typography.Text>
            }
            hasError={errors.zipCode != null}
            errorMessage={errors.zipCode?.message}
            containerWidth="100%"
            showSuccessStatus
          />
        </GroupFormItems>
        <GroupFormItems>
          <MyFormItem
            id="address"
            control={control}
            placeholder="131-151 Great Titchfield St., London W1W 5BB"
            label={
              <Typography.Text className="field-label">Address</Typography.Text>
            }
            hasError={errors.address != null}
            errorMessage={errors.address?.message}
            containerWidth="34.097vw"
            showSuccessStatus
          />
          <MyFormItem
            id="deliveryType"
            control={control}
            type="select"
            label={
              <Typography.Text className="field-label">Type</Typography.Text>
            }
            containerWidth="15rem"
            selectBoxData={selectDeliveryType}
          />
        </GroupFormItems>
        <GroupCheckbox>
          <MyFormItem
            id="deliveryTime"
            type="checkbox"
            control={control}
            containerWidth="fit-content"
            hasError={errors.deliveryTime != null}
            errorMessage={errors.deliveryTime?.message}
          >
            Office hours only
          </MyFormItem>
          <MyFormItem
            id="deliveryTime"
            type="checkbox"
            control={control}
            containerWidth="fit-content"
          >
            Every day of the week (matches home address)
          </MyFormItem>
        </GroupCheckbox>
        <MyFormItem
          id="note"
          control={control}
          type="textarea"
          placeholder="Type something here..."
          label={
            <Typography.Text className="field-label">Note</Typography.Text>
          }
          containerWidth="100%"
        />
      </PersonalInfoForm>
    </Container>
  );
};

export default PersonalInformation;
