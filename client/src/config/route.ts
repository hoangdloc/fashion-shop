export enum AppRoute {
  HOME = '/',
  ABOUT = '/about',
  CONTACT = '/contact',
  SHOP = '/shop',
  CART = '/cart',
  LOGIN = '/login',
  SIGNUP = '/signup'
}

export enum ShopRoute {
  INDEX = '',
  MEN = 'men',
  WOMEN = 'women',
  UNISEX = 'unisex'
}

export enum ShopPathname {
  MEN = `${AppRoute.SHOP}/${ShopRoute.MEN}`,
  WOMEN = `${AppRoute.SHOP}/${ShopRoute.WOMEN}`,
  UNISEX = `${AppRoute.SHOP}/${ShopRoute.UNISEX}`
}

export enum CartRoute {
  INDEX = '',
  CHECKOUT = 'checkout'
}

export const SLUG = ':slug';
