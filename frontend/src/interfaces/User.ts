export interface User{
    _id?: string,
    name: string,
    email: string
}

export interface UserLogin{
    email: string,
    password: string
}

export interface RegisterUser{
    name: string,
    email: string,
    password: string   
}