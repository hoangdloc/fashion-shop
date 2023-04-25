import { Category } from './category';
import { Size } from './size';

export interface Clothes {
  id: number
  name: string
  images: string[]
  price: number
  salePercent: number
  soldOut: boolean
  hot: boolean
  bestSeller: boolean,
  featured: boolean,
  overview: string
  description: string[]
  category: Category
  sizes: Size[]
}
