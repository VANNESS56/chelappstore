'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Star, Zap } from 'lucide-react';

export default function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-accent/15 to-primary/15 rounded-full blur-3xl"
                />

                {/* Floating Shapes */}
                <motion.div
                    animate={{ y: [-20, 20, -20] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl rotate-12"
                />
                <motion.div
                    animate={{ y: [20, -20, 20] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-1/3 left-1/5 w-16 h-16 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl -rotate-12"
                />
                <motion.div
                    animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 right-1/6 w-12 h-12 bg-gradient-to-br from-primary/15 to-accent/15 rounded-xl rotate-45"
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
                        >
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Toko Aplikasi Premium</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6"
                        >
                            Temukan{' '}
                            <span className="gradient-text">Aplikasi Premium</span>
                            {' '}untuk Kehidupan Digitalmu
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0"
                        >
                            Jelajahi koleksi aplikasi berkualitas tinggi yang dikurasi dengan cermat.
                            Dari alat produktivitas hingga suite kreatif, temukan aplikasi sempurna
                            untuk meningkatkan alur kerjamu dan membuka kemungkinan baru.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary inline-flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                Jelajahi Aplikasi
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-secondary inline-flex items-center justify-center gap-2"
                            >
                                Pelajari Lebih Lanjut
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-8 justify-center lg:justify-start mt-12"
                        >
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
                        </motion.div>
                    </div>

                    {/* Right Content - App Preview Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-full h-[500px]">
                            {/* Main Card */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 card shadow-2xl shadow-primary/20 z-10"
                            >
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
                            </motion.div>

                            {/* Secondary Cards */}
                            <motion.div
                                animate={{ y: [10, -10, 10] }}
                                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute top-10 left-10 w-48 card opacity-80"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-3">
                                    <Download className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-semibold text-text-primary">TaskFlow</h4>
                                <span className="text-sm text-primary font-medium">Rp 449.000</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [-8, 8, -8] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute bottom-10 right-10 w-48 card opacity-80"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-3">
                                    <Star className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-semibold text-text-primary">MediaPro</h4>
                                <span className="text-sm text-primary font-medium">Rp 599.000</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
