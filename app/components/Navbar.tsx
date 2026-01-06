'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: 'Beranda', href: '#home' },
  { name: 'Aplikasi', href: '#apps' },
  { name: 'Testimoni', href: '#testimonials' },
  { name: 'Kontak', href: '#contact' },
  { name: 'Dashboard', href: '/dashboard' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-slide-down ${isScrolled
            ? 'glass-strong shadow-lg shadow-black/5'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 transition-transform duration-500 group-hover:rotate-180">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">
                Chel<span className="gradient-text">AppStore</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-text-secondary hover:text-primary font-medium transition-all duration-300 relative group hover:-translate-y-0.5"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button className="px-5 py-2.5 text-text-secondary hover:text-primary font-medium transition-colors duration-300">
                Masuk
              </button>
              <button className="btn-primary !py-2.5 !px-5">
                Daftar
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-border-light transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-text-primary" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 z-40 glass-strong mx-4 rounded-2xl shadow-xl md:hidden animate-fade-in">
          <div className="p-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-text-secondary hover:text-primary font-medium py-2 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="border-t border-border mt-2 pt-4 flex flex-col gap-3">
              <button className="btn-secondary w-full">Masuk</button>
              <button className="btn-primary w-full">Daftar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
