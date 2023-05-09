import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { type Color } from '~/shared/@types/category';
import { type Clothes } from '~/shared/@types/clothes';
import { type Size } from '~/shared/@types/size';
import { type RootState } from '~/store/store';

interface IClothesDetailsContext {
  currentClothes: Clothes | undefined
  pickedColor: Color | undefined
  setPickedColor: React.Dispatch<React.SetStateAction<Color | undefined>>
  pickedSize: Size | undefined
  setPickedSize: React.Dispatch<React.SetStateAction<Size | undefined>>
}

const ClothesDetailsContext = createContext<IClothesDetailsContext | null>(
  null
);

const ClothesDetailsProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const currentClothes = useSelector(
    (state: RootState) => state.clothes.currentClothes
  );
  const [pickedColor, setPickedColor] = useState<Color | undefined>(undefined);
  const [pickedSize, setPickedSize] = useState<Size | undefined>(undefined);

  const values = {
    currentClothes,
    pickedColor,
    setPickedColor,
    pickedSize,
    setPickedSize
  };

  return (
    <ClothesDetailsContext.Provider value={values}>
      {children}
    </ClothesDetailsContext.Provider>
  );
};

function useClothesDetails (): IClothesDetailsContext {
  const context = useContext(ClothesDetailsContext);
  if (context == null) {
    throw new Error('useClothesDetails must be used within ClothesDetailsProvider');
  }
  return context;
}

export { ClothesDetailsProvider, useClothesDetails };
