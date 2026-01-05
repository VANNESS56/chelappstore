'use client';

import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import TestimonialSection from './components/TestimonialSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <ProductProvider>
      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <ProductGrid />
        <TestimonialSection />
        <Footer />
      </main>
    </ProductProvider>
  );
}
