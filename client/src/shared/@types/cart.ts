export interface CartItem {
  clothesId: number
  userId: number
  quantity: number
}

export type Cart = CartItem[];
