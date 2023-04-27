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
  role: UserRole
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserResponse {
  data: {
    token: string
  }
  status: number
}
