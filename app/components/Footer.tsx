'use client';

import { motion } from 'framer-motion';
import { Sparkles, Github, Twitter, Linkedin, Instagram, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
];

const footerLinks = [
    {
        title: 'Produk',
        links: ['Semua Aplikasi', 'Kategori', 'Rilis Baru', 'Terlaris', 'Aplikasi Gratis'],
    },
    {
        title: 'Perusahaan',
        links: ['Tentang Kami', 'Karir', 'Blog', 'Pers', 'Mitra'],
    },
    {
        title: 'Bantuan',
        links: ['Pusat Bantuan', 'Hubungi Kami', 'FAQ', 'Komunitas', 'Developer'],
    },
    {
        title: 'Legal',
        links: ['Kebijakan Privasi', 'Syarat Layanan', 'Kebijakan Refund', 'Lisensi'],
    },
];

export default function Footer() {
    return (
        <footer id="contact" className="relative bg-gradient-to-b from-background to-white pt-20 pb-8">
            {/* Top Decorative Border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="card bg-gradient-to-br from-primary to-accent p-8 sm:p-12 mb-16 text-center overflow-hidden relative"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,white_1px,transparent_1px)] bg-[size:20px_20px]" />
                    </div>

                    <div className="relative">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                            Tetap Update dengan Aplikasi Baru
                        </h3>
                        <p className="text-white/80 mb-6 max-w-lg mx-auto">
                            Dapatkan notifikasi tentang rilis terbaru, penawaran eksklusif, dan tips
                            untuk memaksimalkan produktivitasmu.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Masukkan email kamu"
                                className="flex-1 px-5 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Berlangganan
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-text-primary">
                                Chel<span className="gradient-text">AppStore</span>
                            </span>
                        </Link>
                        <p className="text-text-secondary mb-6 max-w-xs">
                            Destinasi terpercaya untuk aplikasi premium yang meningkatkan pengalaman digital kamu.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 bg-surface hover:bg-primary/10 border border-border-light hover:border-primary/30 rounded-xl flex items-center justify-center text-text-secondary hover:text-primary transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    {footerLinks.map((column) => (
                        <div key={column.title}>
                            <h4 className="font-bold text-text-primary mb-4">{column.title}</h4>
                            <ul className="space-y-3">
                                {column.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-text-secondary hover:text-primary transition-colors duration-300 text-sm"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border-light">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-text-secondary text-center sm:text-left">
                            © {new Date().getFullYear()} ChelAppStore. Seluruh hak cipta dilindungi.
                        </p>
                        <p className="text-sm text-text-secondary flex items-center gap-1">
                            Dibuat dengan <Heart className="w-4 h-4 text-red-500 fill-red-500" /> oleh Tim ChelAppStore
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
