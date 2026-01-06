'use client';

import { Star, ShoppingCart, Loader2, RefreshCw } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const WHATSAPP_NUMBER = '6289527957369';

const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

export default function ProductGrid() {
    const { products, loading, error, refreshProducts } = useProducts();

    const handleBuy = (productName: string, price: number) => {
        const message = encodeURIComponent(
            `Halo, saya tertarik untuk membeli *${productName}* dengan harga ${formatRupiah(price)}. Mohon informasi lebih lanjut.`
        );
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section id="apps" className="py-24 relative">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-white to-background" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                        Aplikasi Unggulan
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                        Jelajahi <span className="gradient-text">Koleksi Premium</span> Kami
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Aplikasi pilihan yang dirancang untuk meningkatkan produktivitas dan kreativitasmu.
                        Setiap aplikasi dikurasi dengan cermat untuk kualitas dan performa terbaik.
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <p className="text-text-secondary">Memuat produk...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="text-center">
                            <p className="text-red-500 mb-4">{error}</p>
                            <button
                                onClick={refreshProducts}
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Coba Lagi
                            </button>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && products.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="text-center">
                            <p className="text-text-secondary mb-2">Belum ada produk tersedia.</p>
                            <p className="text-text-muted text-sm">Produk akan muncul di sini setelah ditambahkan melalui dashboard.</p>
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                {!loading && !error && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className="group card card-hover relative overflow-hidden animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Badge */}
                                {product.badge && (
                                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                                        {product.badge}
                                    </div>
                                )}

                                {/* Category */}
                                <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary uppercase tracking-wide mb-3">
                                    {product.category}
                                </span>

                                {/* Name & Description */}
                                <h3 className="font-bold text-xl text-text-primary mb-2 group-hover:text-primary transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                                    {product.description}
                                </p>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.rating)
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-gray-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-text-secondary">
                                        {product.rating} ({product.reviews.toLocaleString('id-ID')})
                                    </span>
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-border-light">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold text-primary">
                                            {formatRupiah(product.price)}
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-xs text-text-muted line-through">
                                                {formatRupiah(product.originalPrice)}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleBuy(product.name, product.price)}
                                        className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-green-500/25 hover:scale-105 active:scale-95"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        <span className="font-medium text-sm">Beli</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* View All Button */}
                {!loading && !error && products.length > 0 && (
                    <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                        <button className="btn-secondary">
                            Lihat Semua Aplikasi
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
