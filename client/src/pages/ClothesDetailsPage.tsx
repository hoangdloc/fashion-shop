import React, { Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import
{
  ClothesDetailSection,
  ClothesDetailSectionSkeleton,
  NotFoundProduct
} from '~/modules/clothes';
import MyBreadcrump from '~/shared/components/breadcrumb';
import { useGetCurrentClothesQuery } from '~/store/clothes/clothesService';

import type { Clothes } from '~/shared/@types/clothes';

const ClothesDetailsPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const slug = params.slug as string;
  const currentClothes: Clothes | null = location.state;
  const { data, isFetching, isSuccess } = useGetCurrentClothesQuery(slug);

  if (currentClothes == null && isFetching) {
    return <ClothesDetailSectionSkeleton />;
  }

  if (currentClothes == null && data == null && isSuccess) {
    return <NotFoundProduct />;
  }

  return (
    <Fragment>
      <MyBreadcrump productName={currentClothes?.name ?? data?.name} />
      <ClothesDetailSection />
    </Fragment>
  );
};

export default ClothesDetailsPage;
