import type { RegisterUser, User, UserLogin } from "./User";

export interface AuthContextType{
    user: User | null,
    login: (data: UserLogin) => Promise<void>,
    register: (data: RegisterUser) => Promise<void>,
    logout: () => void
}