import { useState, type FunctionComponent } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRoutesProps {
    children: React.ReactNode
}

const ProtectedRoutes: FunctionComponent<ProtectedRoutesProps> = () => {
    const auth = useAuth()
    /* const location = useLocation(); */
    const user = auth?.user
    
    if (!user) return <Navigate to="/login" />
/* 
    if (user && location.pathname === "/login" || location.pathname === "/register") return <Navigate to="/" /> */
    
    return <Outlet />
    /* return <>{children}</> */
}

export default ProtectedRoutes;