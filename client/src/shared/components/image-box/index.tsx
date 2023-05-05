import styled from '@emotion/styled';
import React from 'react';

interface ImageBoxProps extends React.ComponentProps<'figure'> {
  src: string
  alt?: string
  size?: string
  className?: string
  containerStyle?: React.CSSProperties
}

const ImageBoxStyles = styled.figure<Pick<ImageBoxProps, 'size'>>`
  width: ${props => props.size};
  height: ${props => props.size};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageBox: React.FC<ImageBoxProps> = ({
  src,
  alt = 'Product photo',
  size = '8rem',
  className,
  containerStyle,
  ...rest
}) => {
  return (
    <ImageBoxStyles
      className={className}
      style={containerStyle}
      size={size}
      {...rest}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
      />
    </ImageBoxStyles>
  );
};

export default ImageBox;
