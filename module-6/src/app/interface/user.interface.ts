import { Model } from "mongoose"

export interface IUser {
    firstName: string,
    lastName: string,
    role: 'user' | 'admin' | 'subAdmin',
    email: string,
    password: string
}

export interface UserInstanceMethod {
    hashPassword(password: string) : string
}

export interface UserStaticMethod extends Model<IUser> {
    hashPassword(password: string) : string
}