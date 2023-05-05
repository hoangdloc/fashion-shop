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
  MEN = 'men',
  WOMEN = 'women',
  UNISEX = 'unisex'
}

export enum ShopPathname {
  MEN = `${AppRoute.SHOP}/${ShopRoute.MEN}`,
  WOMEN = `${AppRoute.SHOP}/${ShopRoute.WOMEN}`,
  UNISEX = `${AppRoute.SHOP}/${ShopRoute.UNISEX}`
}

export const SLUG = ':slug';
