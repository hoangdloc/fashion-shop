import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import { Color, Gender, Type } from '../@types/category';
import { Clothes } from '../@types/clothes';
import { Size } from '../@types/size';

const clothes: Clothes[] = JSON.parse(
  fs.readFileSync(path.join('./src/data', 'clothes.json')).toString()
);

interface getAllClothesQuery {
  gender?: Gender;
  type?: Type;
  color?: Color;
  size?: Size;
  sortByPrice?: '0' | '1';
  featured?: string;
  bestSeller?: string;
}

const getAllClothes = (req: Request, res: Response) => {
  let clothings = clothes;
  const { gender, type, color, size, sortByPrice, featured, bestSeller } =
    req.query as getAllClothesQuery;

  if (gender) {
    clothings = clothings.filter(
      clothes => clothes.category[0].toLowerCase() === gender.toLowerCase()
    );
  }
  if (type) {
    clothings = clothings.filter(
      clothes => clothes.category[1].toLowerCase() === type.toLowerCase()
    );
  }
  if (featured !== undefined) {
    clothings = clothings.filter(
      clothes => clothes.featured === (featured === ' true')
    );
  }

  if (bestSeller !== undefined) {
    clothings = clothings.filter(
      clothes => clothes.bestSeller === (bestSeller === 'true')
    );
  }
  if (color) {
    clothings = clothings.filter(clothes => {
      const colors = clothes.category.slice(2);
      for (const c of colors) {
        if (c.toLowerCase() === color.toLowerCase()) return true;
      }
      return false;
    });
  }
  if (size) {
    clothings = clothings.filter(clothes => {
      for (const s of clothes.sizes) {
        if (s.toLowerCase() === size.toLowerCase()) return true;
      }
      return false;
    });
  }
  if (sortByPrice) {
    if (+sortByPrice === 0) {
      clothings = clothings.sort((a, b) => {
        const actualPriceA = a.price - a.price * (a.salePercent / 100);
        const actualPriceB = b.price - b.price * (b.salePercent / 100);
        return actualPriceA - actualPriceB;
      });
    } else if (+sortByPrice === 1) {
      clothings = clothings.sort((a, b) => {
        const actualPriceA = a.price - a.price * (a.salePercent / 100);
        const actualPriceB = b.price - b.price * (b.salePercent / 100);
        return actualPriceB - actualPriceA;
      });
    }
  }

  res.status(200).json({
    status: 'success',
    results: clothings.length,
    data: {
      clothings
    }
  });
};

const getClothes = (req: Request, res: Response) => {
  const id = +req.params.id;

  const cloth = clothes.find(c => c.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      clothes: cloth
    }
  });
};

const createClothes = (req: Request, res: Response) => {
  const newId = clothes[clothes.length - 1].id + 1;
  const newClothes = Object.assign({ id: newId }, req.body);

  clothes.push(newClothes);

  fs.writeFileSync(
    path.join('./src/data', 'clothes.json'),
    JSON.stringify(clothes)
  );

  res.status(201).json({
    status: 'success',
    data: {
      clothes: newClothes
    }
  });
};

export default { getAllClothes, getClothes, createClothes };
