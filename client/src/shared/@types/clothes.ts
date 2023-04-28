import { Category } from './category';
import { Size } from './size';
import { Status } from './status';

export interface Clothes {
  id: number
  name: string
  slug: string
  images: string[]
  price: number
  salePercent: number
  status: Status
  bestSeller: boolean
  featured: boolean
  overview: string
  description: string[]
  category: Category
  sizes: Size[]
}

export interface ClothesResponse {
  status: string
  results: number
  data: {
    clothings: Clothes[]
  }
}
