import type { Category } from './category';
import type { Size } from './size';
import type { Status } from './status';

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

export interface ClothingsResponse {
  status: string
  results: number
  data: {
    clothings: Clothes[]
  }
}

export interface ClothesResponse {
  status: string
  data: {
    clothes: Clothes
  }
}
