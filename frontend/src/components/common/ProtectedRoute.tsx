import type React from "react"
import { useAuth } from "../../providers/auth-provider"
import { Navigate } from "react-router-dom";

type ProtectedRouteType = {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteType) {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading....</p>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>;
}