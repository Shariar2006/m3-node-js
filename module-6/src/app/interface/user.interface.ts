export interface IUser {
    firstName: string,
    lastName: string,
    role: 'user' | 'admin' | 'subAdmin',
    email: string,
    password: string
}