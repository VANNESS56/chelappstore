'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ProductProvider } from '../context/ProductContext';
import InstructorDashboard from '../components/InstructorDashboard';
import LoginForm from '../components/LoginForm';
import { Loader2 } from 'lucide-react';

function DashboardContent() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // Show loading while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-text-secondary">Memeriksa sesi...</p>
                </div>
            </div>
        );
    }

    // Show login form if not authenticated
    if (!isAuthenticated) {
        return <LoginForm onSuccess={() => router.refresh()} />;
    }

    // Show dashboard if authenticated
    return (
        <ProductProvider>
            <InstructorDashboard />
        </ProductProvider>
    );
}

export default function DashboardPage() {
    return (
        <AuthProvider>
            <DashboardContent />
        </AuthProvider>
    );
}
