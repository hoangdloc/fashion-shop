import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { v4 } from 'uuid';

import { Clothes } from '../../@types/clothes';
import { chunkArray } from '../../utils/chunkArray';
import { ClothesCard, ClothesSkeletonCard } from '../clothes-card';

interface ListCardsProps {
  columnCount: number
  data?: Clothes[]
  loading?: boolean
}

const antdColsSystem = 24;

const ListCardsStyles = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.8rem'
}));

const ListCards: React.FC<ListCardsProps> = props => {
  const { data, columnCount, loading = false } = props;

  const renderSkeletonList = (): JSX.Element[] => {
    return new Array(2).fill(0).map(() => (
      <Row key={v4()}>
        {new Array(columnCount).fill(0).map(() => (
          <Col
            key={v4()}
            span={antdColsSystem / columnCount}
          >
            <ClothesSkeletonCard />
          </Col>
        ))}
      </Row>
    ));
  };

  const renderList = (): JSX.Element[] | null => {
    if (data != null) {
      const chunkedData = chunkArray(data, columnCount);

      return chunkedData.map(row => (
        <Row key={v4()}>
          {row.map(col => (
            <Col
              key={v4()}
              span={antdColsSystem / columnCount}
            >
              <ClothesCard clothes={col} />
            </Col>
          ))}
        </Row>
      ));
    }

    return null;
  };

  return (
    <ListCardsStyles>
      {loading && data === undefined ? renderSkeletonList() : renderList()}
    </ListCardsStyles>
  );
};

export default ListCards;
