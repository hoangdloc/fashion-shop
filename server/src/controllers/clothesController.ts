import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import AppError from '../utils/appError';
import { calcActualPrice } from './../utils/price';

import { Color, Gender, Type } from '../@types/category';
import { Clothes } from '../models/clothes';
import { Size } from '../@types/size';
import { Sorting } from '../@types/sorting';

const clothes: Clothes[] = JSON.parse(
  fs.readFileSync(path.join('./src/data', 'clothes.json')).toString()
);

interface getAllClothesQuery {
  gender?: Gender;
  type?: Type;
  color?: Color;
  size?: Size;
  sortByPrice?: Sorting;
  featured?: string;
  bestSeller?: string;
  minPrice?: string;
  maxPrice?: string;
  keyword?: string;
  page?: string;
  limit?: string;
}

const getAllClothes = (req: Request, res: Response, next: NextFunction) => {
  let clothings = clothes;
  const {
    gender,
    type,
    color,
    size,
    sortByPrice,
    featured,
    bestSeller,
    minPrice,
    maxPrice,
    keyword,
    page = '0',
    limit = '50'
  } = req.query as getAllClothesQuery;

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
      clothes => clothes.featured === (featured === 'true')
    );
  }

  if (bestSeller !== undefined) {
    clothings = clothings.filter(
      clothes => clothes.bestSeller === (bestSeller === 'true')
    );
  }

  if (minPrice != null && maxPrice == null) {
    return next(new AppError('Please provide maximum price!'));
  }
  if (minPrice == null && maxPrice != null) {
    return next(new AppError('Please provide minimum price!'));
  }
  if (minPrice != null && maxPrice != null) {
    clothings = clothings.filter(clothes => {
      return (
        calcActualPrice(clothes.price, clothes.salePercent) >=
          Number(minPrice) &&
        calcActualPrice(clothes.price, clothes.salePercent) <= Number(maxPrice)
      );
    });
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

  if (keyword) {
    clothings = clothings.filter(clothes =>
      clothes.name.toLowerCase().includes((keyword ?? '').trim().toLowerCase())
    );
  }

  if (sortByPrice) {
    switch (sortByPrice) {
      case Sorting.LOW_TO_HIGH:
        clothings = clothings.sort((a, b) => {
          return (
            calcActualPrice(a.price, a.salePercent) -
            calcActualPrice(b.price, b.salePercent)
          );
        });
        break;
      case Sorting.HIGH_TO_LOW:
        clothings = clothings.sort((a, b) => {
          return (
            calcActualPrice(b.price, b.salePercent) -
            calcActualPrice(a.price, a.salePercent)
          );
        });
        break;
      default:
        break;
    }

  }

  // PAGINATION
  const startIndex = parseInt(page) * parseInt(limit);
  const endIndex = (parseInt(page) + 1) * parseInt(limit);

  res.status(200).json({
    status: 'success',
    results: clothings.length,
    data: {
      clothings: clothings.slice(startIndex, endIndex)
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

const getCurrentClothes = (req: Request, res: Response) => {
  const slug = req.params.slug;

  const cloth = clothes.find(c => c.slug === slug);

  res.status(200).json({
    status: 'success',
    data: {
      clothes: cloth
    }
  });
};

const createClothes = (req: Request, res: Response, next: NextFunction) => {
  const newId = clothes[clothes.length - 1].id + 1;
  const newClothes: Clothes = Object.assign({ id: newId }, req.body);

  const checkExistedSlug = clothes.find(item => item.slug === newClothes.slug);

  if (checkExistedSlug) {
    return next(new AppError('Clothes slug has already existed!', 401));
  }

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

export default {
  getAllClothes,
  getClothes,
  getCurrentClothes,
  createClothes
};
