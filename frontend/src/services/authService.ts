import axios from "axios";
import type { RegisterUser, UserLogin } from "../interfaces/User";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
    withCredentials: true  // ⚠️ important for cookies!
})

// check user
export const getMe = () => api.get('/me')

// create a user
export const signinUSer = (newUser: RegisterUser) => api.post('/register', newUser);

// login user
export const loginUser = (user: UserLogin) => api.post('/login', user)

//logout user
export const logoutUSer = () => api.post('/logout')
