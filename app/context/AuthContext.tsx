'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'chelapp2024';
const AUTH_KEY = 'chelappstore_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const checkAuth = () => {
            try {
                const stored = sessionStorage.getItem(AUTH_KEY);
                if (stored) {
                    const { expiry } = JSON.parse(stored);
                    if (expiry && new Date().getTime() < expiry) {
                        setIsAuthenticated(true);
                    } else {
                        sessionStorage.removeItem(AUTH_KEY);
                    }
                }
            } catch (error) {
                console.error('Error checking auth:', error);
                sessionStorage.removeItem(AUTH_KEY);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (username: string, password: string): boolean => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Store session with 24 hour expiry
            const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
            sessionStorage.setItem(AUTH_KEY, JSON.stringify({ authenticated: true, expiry }));
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        sessionStorage.removeItem(AUTH_KEY);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
