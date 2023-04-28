import styled from '@emotion/styled';
import { Skeleton } from 'antd';
import React from 'react';

const ClothesSkeletonCardStyles = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
}));

const ClothesSkeletonCard: React.FC = () => {
  return (
    <ClothesSkeletonCardStyles>
      <Skeleton.Image style={{ height: '40.4rem', width: '26.8rem' }} active />
      <Skeleton paragraph={{ rows: 1 }} active />
    </ClothesSkeletonCardStyles>
  );
};

export default ClothesSkeletonCard;
