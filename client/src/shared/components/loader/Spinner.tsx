import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

import { theme } from '../../../config/theme';

interface SpinnerProps {
  size?: number | string
  color?: string
}

const Spinner: React.FC<SpinnerProps> = (props) => {
  const { size = 24, color = theme.colors.primaryBlack } = props;

  return <Spin indicator={<LoadingOutlined style={{ fontSize: size, color }} spin />} />;
};

export default Spinner;
