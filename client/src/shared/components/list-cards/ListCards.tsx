/* eslint-disable multiline-ternary */
import styled from '@emotion/styled';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Col, Empty, Row } from 'antd';
import React from 'react';
import { v4 } from 'uuid';

import {
  ClothesCard,
  ClothesSkeletonCard
} from '~/shared/components/clothes-card';

import type { Clothes } from '~/shared/@types/clothes';
import { chunkArray } from '~/shared/utils/chunkArray';
import { useMedia } from '~/shared/hooks/useMedia';
import CarouselCards from '../carousel-cards';

interface ListCardsProps {
  columnCount: number
  data?: Clothes[]
  loading: boolean
  loadingRows?: number
}

const antdColsSystem = 24;

const ListCardsStyles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

const ListCards: React.FC<ListCardsProps> = props => {
  const { data, columnCount, loading = false, loadingRows = 2 } = props;
  const [parent] = useAutoAnimate({ duration: 500 });

  const resultUI = useMedia<'list' | 'carousel'>(
    ['(min-width: 37.5rem)', '(min-width: 0)'],
    ['list', 'carousel'],
    'list'
  );

  const renderSkeletonList = (): JSX.Element[] => {
    return new Array(loadingRows).fill(0).map(() => (
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
        <Row
          key={v4()}
          gutter={16}
        >
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
    <ListCardsStyles ref={parent}>
      {loading || data === undefined ? (
        resultUI === 'list' ? (
          renderSkeletonList()
        ) : (
          <CarouselCards loading={true} />
        )
      ) : data != null && data.length > 0 ? (
        resultUI === 'list' ? (
          renderList()
        ) : (
          <CarouselCards loading={false} data={data} />
        )
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </ListCardsStyles>
  );
};

export default ListCards;
