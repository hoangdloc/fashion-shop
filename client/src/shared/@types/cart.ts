import type { Color } from './category';
import type { Clothes } from './clothes';
import type { Size } from './size';

export interface CartItem {
  id: string
  userId: number
  clothes: Clothes
  quantity: number
  size: Size
  color: Color
}

export type Cart = CartItem[];
