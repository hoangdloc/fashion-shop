import styled from '@emotion/styled';
import { Skeleton } from 'antd';
import React from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const ClothesInformationSkeleton: React.FC = () => {
  return (
    <Container>
      <Skeleton
        title
        active
        paragraph={{ rows: 5, width: 600 }}
      />
      <ActionContainer>
        {new Array(2).fill(0).map((_, index) => (
          <Skeleton.Input
            size="large"
            active
            key={index}
          />
        ))}
      </ActionContainer>
      {new Array(3).fill(0).map((_, index) => (
        <Skeleton.Button
          block
          key={index}
          size="small"
          active
          style={{ marginBottom: '0.8rem' }}
        />
      ))}
    </Container>
  );
};

export default ClothesInformationSkeleton;
