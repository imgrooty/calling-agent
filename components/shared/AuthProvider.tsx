"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
    name?: string;
    email?: string;
    role?: string;
    avatar?: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    refreshSession: () => Promise<boolean>;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    refreshSession: async () => false,
    login: () => { },
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    // Persist user in localStorage for consistency across reloads (simple approach)
    useEffect(() => {
        const savedUser = localStorage.getItem("auth_user");
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (e) {
                console.error("Failed to parse saved user", e);
            }
        }
    }, []);

    const login = (userData: User) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem("auth_user", JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem("auth_user");
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const refreshSession = async () => {
        try {
            console.log("[AuthProvider] Triggering background session refresh...");
            const response = await fetch("/api/auth/refresh", { method: "POST" });

            const data = await response.json();

            if (response.ok) {
                console.log("[AuthProvider] Session refresh successful");
                setIsAuthenticated(true);
                // Update user if returned, merging with existing data to keep fields like email
                if (data.user) {
                    setUser(prev => {
                        const updated = { ...(prev || {}), ...data.user };
                        localStorage.setItem("auth_user", JSON.stringify(updated));
                        return updated;
                    });
                }
                return true;
            } else if (response.status === 401) {
                console.warn("[AuthProvider] Session invalid or expired (401)");
                setIsAuthenticated(false);
                setUser(null);
                localStorage.removeItem("auth_user");

                // Only redirect if we're in a protected route
                const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/leads");
                if (isProtectedRoute && pathname !== "/login") {
                    console.log("[AuthProvider] Redirecting to login due to unauthorized session");
                    router.push("/login");
                }
                return false;
            }
            return false;
        } catch (error) {
            console.error("[AuthProvider] Refresh session error:", error);
            return false;
        }
    };

    useEffect(() => {
        const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/leads");

        if (isDashboard) {
            console.log("[AuthProvider] Dashboard area detected, setting up refresh interval");
            const interval = setInterval(refreshSession, 15 * 60 * 1000);

            return () => clearInterval(interval);
        }
    }, [pathname]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, refreshSession, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
