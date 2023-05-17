export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  role: UserRole
};
