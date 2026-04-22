import { useState, type FunctionComponent } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
    children: React.ReactNode
}

const ProtectedRoutes: FunctionComponent<ProtectedRoutesProps> = ({ children }: ProtectedRoutesProps) => {
    const auth = useAuth()
   
    const user = auth?.user

    if (!user) return <Navigate to="/login" />
    return <>{children}</>
}

export default ProtectedRoutes;