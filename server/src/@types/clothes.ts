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
  overview: string
  description: string[]
  category: Category
  sizes: Size[]
}
