import { createContext, useContext, useEffect, useState } from "react";
import { type AuthContextType } from "../interfaces/AuthContext";
import { type User, type RegisterUser, type UserLogin } from "../interfaces/User";
import { getMe, loginUser, logoutUSer, signinUSer } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate()

    useEffect(() => {
        getMe().then((res) => {
            setUser(res.data.user);
        }).catch((err) => {
            console.log(err);
            setUser(null);
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    // save register user data
    const register = async (data: RegisterUser) => {
        try {
            const res = await signinUSer(data)
            setUser(res.data.user)
            navigate("/")
            // add toastify later here
        } catch (err) {
            console.log(err)
            // add toastify later here
        }
    }
    //save login user data
    const login = async (data: UserLogin) => {
        try {
            const res = await loginUser(data)
            setUser(res.data.user)
            navigate('/')
            console.log("works bitch!");

            // add toastify later here
        } catch (err) {
            console.log(err)
            // add toastify later here
        }
    }
    //logout user data
    const logout = async () => {
        try {
            await logoutUSer()
            setUser(null)
            navigate('/login')
            // add toastify later here
        } catch (err) {
            console.log(err)
            // add toastify later here
        }
    }
    if (loading) return <h1>Loading...</h1>
    return (
        < AuthContext.Provider value={{ user, login, register, logout }} >
            {children}
        </AuthContext.Provider >
    )

}

export const useAuth = () => useContext(AuthContext)