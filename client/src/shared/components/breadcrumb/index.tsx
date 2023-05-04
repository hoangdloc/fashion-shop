import styled from '@emotion/styled';
import { Breadcrumb } from 'antd';
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AppRoute } from '../../../config/route';

interface MyBreadcrumpProps {
  productName?: string
}

const BreadcrumbShopSection = styled.section`
  width: 100%;
  padding: 2.8rem 16rem;
  background-color: ${props => props.theme.colors.footerBg};
  & > .ant-breadcrumb {
    color: ${props => props.theme.colors.primaryBlack};
    font-size: 1.6rem;
    & .ant-breadcrumb-separator {
      color: inherit;
    }
  }
`;

const breadcrumbNameMap: Record<string, string> = {
  '/shop': 'Shop',
  '/shop/men': 'For Men',
  '/shop/women': 'For Women',
  '/shop/unisex': 'For Unisex',
  '/cart': 'Cart',
  '/cart/checkout': 'Checkout'
};

const MyBreadcrump: React.FC<MyBreadcrumpProps> = ({ productName }) => {
  const location = useLocation();
  const params = useParams();
  const slug = params.slug;
  const pathSnippets = location.pathname
    .split('/')
    .filter(i => i !== '' && i !== slug);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url]}</Link>
    };
  });

  let breadcrumbItems = [
    {
      key: '/',
      title: <Link to={AppRoute.HOME}>Home</Link>
    }
  ].concat(extraBreadcrumbItems);

  if (productName != null) {
    breadcrumbItems = breadcrumbItems.concat([
      {
        key: location.pathname,
        title: <Link to={location.pathname}>{productName}</Link>
      }
    ]);
  }

  return (
    <BreadcrumbShopSection>
      <Breadcrumb items={breadcrumbItems} />
    </BreadcrumbShopSection>
  );
};

export default MyBreadcrump;
