import { Category } from '../@types/category';
import { Size } from '../@types/size';
import { Status } from '../@types/status';

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
