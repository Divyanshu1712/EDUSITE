import type React from "react"
import { useAuth } from "../../providers/auth-provider"
import { Navigate } from "react-router-dom"
import PageLoader from "./PageLoader"

type ProtectedRouteType = {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteType) {

    const { isAuthenticated, loading } = useAuth()

    // Auth check is still in progress (token being verified against /auth/me).
    // Show a fullscreen loader — the layout hasn't mounted yet so we need
    // our own viewport-filling wrapper here.
    if (loading) {
        return (
            <div
                className="
                    fixed inset-0 z-50
                    flex items-center justify-center
                    bg-background
                "
            >
                {/*
                  * Wrap in a relative box so PageLoader's `absolute inset-0`
                  * has a sized parent to fill.
                  */}
                <div className="relative w-56 h-40 rounded-2xl border border-border bg-card shadow-sm">
                    <PageLoader message="Checking authentication…" />
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}
