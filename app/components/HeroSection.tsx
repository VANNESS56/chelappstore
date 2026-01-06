'use client';

import { ArrowRight, Download, Star, Zap } from 'lucide-react';

export default function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-accent/15 to-primary/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

                {/* Floating Shapes */}
                <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl rotate-12 animate-float" />
                <div className="absolute bottom-1/3 left-1/5 w-16 h-16 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl -rotate-12 animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 right-1/6 w-12 h-12 bg-gradient-to-br from-primary/15 to-accent/15 rounded-xl rotate-45 animate-float" style={{ animationDelay: '2s' }} />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-fade-in">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Toko Aplikasi Premium</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            Temukan{' '}
                            <span className="gradient-text">Aplikasi Premium</span>
                            {' '}untuk Kehidupan Digitalmu
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            Jelajahi koleksi aplikasi berkualitas tinggi yang dikurasi dengan cermat.
                            Dari alat produktivitas hingga suite kreatif, temukan aplikasi sempurna
                            untuk meningkatkan alur kerjamu dan membuka kemungkinan baru.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            <button className="btn-primary inline-flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" />
                                Jelajahi Aplikasi
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button className="btn-secondary inline-flex items-center justify-center gap-2">
                                Pelajari Lebih Lanjut
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 justify-center lg:justify-start mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            {[
                                { value: '50K+', label: 'Unduhan' },
                                { value: '200+', label: 'Aplikasi Premium' },
                                { value: '4.9', label: 'Rating Rata-rata', icon: Star },
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
                                        {stat.icon && <stat.icon className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                                    </div>
                                    <span className="text-sm text-text-secondary">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - App Preview Cards */}
                    <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="relative w-full h-[500px]">
                            {/* Main Card */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 card shadow-2xl shadow-primary/20 z-10 animate-float">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                                    <Zap className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-bold text-lg text-text-primary mb-2">ProDesign Suite</h3>
                                <p className="text-sm text-text-secondary mb-4">Alat desain profesional</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-primary font-bold">Rp 749.000</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm font-medium">4.9</span>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Cards */}
                            <div className="absolute top-10 left-10 w-48 card opacity-80 animate-float" style={{ animationDelay: '0.5s' }}>
                                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-3">
                                    <Download className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-semibold text-text-primary">TaskFlow</h4>
                                <span className="text-sm text-primary font-medium">Rp 449.000</span>
                            </div>

                            <div className="absolute bottom-10 right-10 w-48 card opacity-80 animate-float" style={{ animationDelay: '1s' }}>
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-3">
                                    <Star className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-semibold text-text-primary">MediaPro</h4>
                                <span className="text-sm text-primary font-medium">Rp 599.000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
