export enum Gender {
  WOMEN = 'Women',
  MEN = 'Men',
  UNISEX = 'Unisex'
}

export enum Type {
  CLOTHING = 'Clothing',
  ACCESSORIES = 'Accessories',
  SHOES = 'Shoes',
  HAT = 'Hat'
}

export enum Color {
  WHITE = 'White',
  BLACK = 'Black',
  RED = 'Red',
  YELLOW = 'Yellow',
  BLUE = 'Blue'
}

// Tuple
export type Category = [Gender, Type, ...Color[]];
