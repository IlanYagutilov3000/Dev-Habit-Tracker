import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PublicRoutes = () => {
    const auth = useAuth()
    const user = auth?.user;

    if (user) return <Navigate to="/" />

    return <Outlet />
}

export default PublicRoutes;