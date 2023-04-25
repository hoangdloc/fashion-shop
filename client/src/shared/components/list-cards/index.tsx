import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { v4 } from 'uuid';

import { chunkArray } from '../../utils/chunkArray';
import ClothesCard from '../clothes-card';

interface ListCardsProps {
  columnCount: number
  data: any
}

const antdColsSystem = 24;

const ListCardsStyles = styled('div')(props => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.8rem'
}));

const ListCards: React.FC<ListCardsProps> = props => {
  const { data, columnCount } = props;

  const renderList = (): JSX.Element[] => {
    const chunkedData = chunkArray(data, columnCount);

    return chunkedData.map(row => (
      <Row key={v4()}>
        {row.map(col => (
          <Col
            key={v4()}
            span={antdColsSystem / columnCount}
          >
            <ClothesCard />
          </Col>
        ))}
      </Row>
    ));
  };

  return <ListCardsStyles>{renderList()}</ListCardsStyles>;
};

export default ListCards;
