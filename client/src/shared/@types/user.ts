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

export type UserSignup = Omit<User, 'id' | 'role'> & UserLogin

export interface UserResponse {
  data: {
    token: string
  }
  status: number
}

export interface UserResetPassword {
  email: string
  password: string
}
