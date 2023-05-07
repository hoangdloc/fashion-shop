import styled from '@emotion/styled';
import { Skeleton } from 'antd';
import React from 'react';

const Container = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const ImageBoxListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const ImageCollectionSkeleton: React.FC = () => {
  return (
    <Container>
      <ImageBoxListContainer>
        {new Array(4).fill(0).map((_, index) => (
          <Skeleton.Image
            key={index}
            style={{ width: '8rem', height: '8rem' }}
            active
          />
        ))}
      </ImageBoxListContainer>
      <Skeleton.Image
        style={{ width: '36.3rem', height: '55rem' }}
        active
      />
    </Container>
  );
};

export default ImageCollectionSkeleton;
