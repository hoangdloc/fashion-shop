import { User } from './user';

export interface JWTDecoded {
  user: User
  iat: number
  exp: number
}
