import { type Clothes } from './clothes';

export interface CartItem {
  userId: number
  clothes: Clothes
  quantity: number
}

export type Cart = CartItem[];
