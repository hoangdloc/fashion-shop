import React from 'react';
import { Collapse, Typography } from 'antd';
import { PlusIcon, SubstractIcon } from '../../../shared/components/icon';
import styled from '@emotion/styled';

import type { Size } from '../../../shared/@types/size';
import type { Category } from '../../../shared/@types/category';

interface ClothesDetailsProps {
  description: string[]
  sizes: Size[]
  category: Category
}

const { Panel } = Collapse;

const CollapseContainer = styled(Collapse)`
  .ant-collapse-item {
    & > .ant-collapse-header {
      padding: 1.2rem 0 0.8rem 0;
      & > .ant-collapse-expand-icon {
        color: ${props => props.theme.colors.primaryBlack};
      }
    }
    & > .ant-collapse-content {
      & > .ant-collapse-content-box {
        padding: 0 0 2rem 0;
      }
    }
  }
  .ant-typography {
    margin: 0;
    font-family: ${props => props.theme.fontFamily.DmSans};
  }
  hr {
    border: none;
    height: 0.1rem;
    background-color: ${props => props.theme.colors.horizontalColor};
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    font-family: ${props => props.theme.fontFamily.DmSans};
    font-size: 1.6rem;
    list-style: square inside;
    color: ${props => props.theme.colors.textSubtitle};
  }
`;

const shippingItems = [
  'Delivery in 5-7 days',
  'Free shipping (New York area only)'
];

const ClothesDetails: React.FC<ClothesDetailsProps> = ({
  description,
  sizes,
  category
}) => {
  const additionalItems = [
    `Category: ${category
      .map((item, index) => {
        if (index !== 0) return item.toLowerCase();
        return item;
      })
      .join(', ')}`,
    `Size: ${sizes.join(', ')}`
  ];

  return (
    <CollapseContainer
      size="small"
      expandIcon={({ isActive }) =>
        isActive === false
          ? (<PlusIcon size="small" />)
          : (<SubstractIcon size="small" />)
      }
      expandIconPosition="end"
      defaultActiveKey={['1', '2', '3']}
      ghost
    >
      <Panel
        header={<Typography.Title level={5}>Description</Typography.Title>}
        key="1"
      >
        <ul>
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Panel>
      <hr />
      <Panel
        header={
          <Typography.Title level={5}>Additional Information</Typography.Title>
        }
        key="2"
      >
        <ul>
          {additionalItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Panel>
      <hr />
      <Panel
        header={
          <Typography.Title level={5}>Shipping and Returns</Typography.Title>
        }
        key="3"
      >
        <ul>
          {shippingItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Panel>
      <hr />
    </CollapseContainer>
  );
};

export default ClothesDetails;