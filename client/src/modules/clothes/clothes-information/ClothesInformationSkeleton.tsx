import styled from '@emotion/styled';
import { Skeleton } from 'antd';
import React from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @media ${props => props.theme.devices.mobile} {
    gap: 2.8rem;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  @media ${props => props.theme.devices.mobile} {
    gap: 2rem;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.8rem;
  margin-bottom: 2.8rem;
  @media ${props => props.theme.devices.mobile} {
    gap: 2.6rem;
    margin-bottom: 2.4rem;
  }
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
      <SelectContainer>
        <Skeleton.Input
          size="small"
          active
          style={{ width: '10vw' }}
        />
        <Skeleton.Input
          size="large"
          active
          style={{ width: '20vw' }}
        />
      </SelectContainer>
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
