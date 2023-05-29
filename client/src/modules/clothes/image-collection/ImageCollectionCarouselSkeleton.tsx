import { Skeleton } from 'antd';
import React from 'react';

const ImageCollectionCarouselSkeleton: React.FC = () => {
  return (
    <Skeleton.Image
      style={{ width: '100%', height: '55rem' }}
      active
    />
  );
};

export default ImageCollectionCarouselSkeleton;
