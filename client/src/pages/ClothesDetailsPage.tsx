import React, { Fragment } from 'react';
import MyBreadcrump from '../shared/components/breadcrumb';
import { useLocation, useParams } from 'react-router-dom';
import { useGetCurrentClothesQuery } from '../store/clothes/clothesService';
import LoadingScreen from '../shared/components/layout/LoadingScreen';
import { NotFoundProduct } from '../modules/clothes';
import type { Clothes } from '../shared/@types/clothes';

const ClothesDetailsPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const slug = params.slug as string;
  const currentClothes: Clothes | null = location.state;
  const { data, isFetching, isSuccess } = useGetCurrentClothesQuery(slug);

  if (currentClothes == null && isFetching) {
    return <LoadingScreen />;
  }

  if (currentClothes == null && data == null && isSuccess) {
    return <NotFoundProduct />;
  }

  return (
    <Fragment>
      <MyBreadcrump productName={currentClothes?.name ?? data?.name} />
    </Fragment>
  );
};

export default ClothesDetailsPage;
