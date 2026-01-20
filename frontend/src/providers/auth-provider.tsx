import React, { createContext, useContext, useEffect, useState } from "react"
import api from "../services/api"

type User = {
    email: string, role: string
}

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("access_token")

        if (!token) {
            setloading(false)
            return;
        }

        api
            .get("/auth/me")
            .then((res) => { setUser(res.data) })
            .catch(() => {
                localStorage.removeItem("access_token")
                setUser(null);
            })
            .finally(() => { setloading(false) })
    }, [])

    const login = async (email: string, password: string) => {

        const res = await api.post("/auth/login", {
            email, password
        })

        const token = res.data.access_token;
        localStorage.setItem(
            "access_token", token
        )

        const me = await api.get("/auth/me");
        setUser(me.data)
    }

    const logout = () => {
        localStorage.removeItem("access_token")
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user, isAuthenticated: !!user, loading, login, logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth must be used wihtin AuthProvider'
        )
    }

    return context;
}