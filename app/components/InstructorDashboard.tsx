'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Pencil, Trash2, X, Save, Loader2,
    Package, Home, Search, Sparkles, RefreshCw, AlertCircle, LogOut,
    LayoutDashboard, Settings, ChevronLeft, Menu, Users, BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { useProducts, Product } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

const categories = [
    'Desain', 'Produktivitas', 'Penulisan', 'Audio',
    'Fotografi', 'Pengembangan', 'Keamanan', 'Gaming', 'Lainnya'
];

const badges = ['', 'Terlaris', 'Populer', 'Baru', 'Pro', 'Diskon'];

interface ProductFormData {
    name: string;
    description: string;
    price: string;
    originalPrice: string;
    rating: string;
    reviews: string;
    category: string;
    badge: string;
}

const initialFormData: ProductFormData = {
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    rating: '5',
    reviews: '0',
    category: 'Desain',
    badge: '',
};

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Produk', icon: Package },
    { id: 'analytics', label: 'Analitik', icon: BarChart3 },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
];

export default function InstructorDashboard() {
    const { products, loading, error, refreshProducts, addProduct, updateProduct, deleteProduct } = useProducts();
    const { logout } = useAuth();
    const [activeMenu, setActiveMenu] = useState('products');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<ProductFormData>(initialFormData);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData(initialFormData);
        setIsModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            originalPrice: product.originalPrice?.toString() || '',
            rating: product.rating.toString(),
            reviews: product.reviews.toString(),
            category: product.category,
            badge: product.badge || '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const productData = {
            name: formData.name,
            description: formData.description,
            price: parseInt(formData.price) || 0,
            originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
            rating: parseFloat(formData.rating) || 5,
            reviews: parseInt(formData.reviews) || 0,
            category: formData.category,
            badge: formData.badge || undefined,
        };

        let success = false;
        if (editingProduct) {
            success = await updateProduct(editingProduct.id, productData);
        } else {
            success = await addProduct(productData);
        }

        setIsSubmitting(false);

        if (success) {
            setIsModalOpen(false);
            setFormData(initialFormData);
            setEditingProduct(null);
        }
    };

    const handleDelete = async (id: number) => {
        setIsDeleting(id);
        await deleteProduct(id);
        setIsDeleting(null);
        setDeleteConfirm(null);
    };

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    // Calculate stats
    const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);
    const avgRating = products.length > 0
        ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)
        : '0';

    return (
        <div className="min-h-screen bg-background flex">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-border flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'
                    } ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                {/* Sidebar Header */}
                <div className={`h-16 border-b border-border flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'}`}>
                    {!sidebarCollapsed && (
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-text-primary">
                                Chel<span className="text-primary">App</span>
                            </span>
                        </Link>
                    )}
                    {sidebarCollapsed && (
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className={`hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-background text-text-secondary transition-colors ${sidebarCollapsed ? 'absolute -right-4 top-4 bg-white border border-border shadow-sm' : ''}`}
                    >
                        <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1">
                    {menuItems.map((item) => (
                        <motion.button
                            key={item.id}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setActiveMenu(item.id);
                                setMobileSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeMenu === item.id
                                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                    : 'text-text-secondary hover:bg-background hover:text-text-primary'
                                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                        </motion.button>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-3 border-t border-border">
                    <Link
                        href="/"
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl text-text-secondary hover:bg-background hover:text-text-primary transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}
                    >
                        <Home className="w-5 h-5 flex-shrink-0" />
                        {!sidebarCollapsed && <span className="font-medium">Kembali ke Beranda</span>}
                    </Link>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowLogoutConfirm(true)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {!sidebarCollapsed && <span className="font-medium">Keluar</span>}
                    </motion.button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileSidebarOpen(true)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-background text-text-secondary"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-text-primary">
                                {menuItems.find(m => m.id === activeMenu)?.label || 'Dashboard'}
                            </h1>
                            <p className="text-sm text-text-secondary hidden sm:block">
                                Kelola semua data dari sini
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={refreshProducts}
                            disabled={loading}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-background hover:bg-primary/10 text-text-secondary hover:text-primary transition-all disabled:opacity-50"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </motion.button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-auto">
                    {/* Dashboard View */}
                    {activeMenu === 'dashboard' && (
                        <div className="space-y-6">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="card bg-gradient-to-br from-primary to-accent text-white"
                                >
                                    <Package className="w-8 h-8 mb-3 opacity-80" />
                                    <p className="text-white/80 text-sm">Total Produk</p>
                                    <p className="text-3xl font-bold">{products.length}</p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="card"
                                >
                                    <BarChart3 className="w-8 h-8 mb-3 text-green-500" />
                                    <p className="text-text-secondary text-sm">Total Nilai Produk</p>
                                    <p className="text-2xl font-bold text-text-primary">{formatRupiah(totalRevenue)}</p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="card"
                                >
                                    <Users className="w-8 h-8 mb-3 text-blue-500" />
                                    <p className="text-text-secondary text-sm">Total Review</p>
                                    <p className="text-2xl font-bold text-text-primary">
                                        {products.reduce((sum, p) => sum + p.reviews, 0).toLocaleString('id-ID')}
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="card"
                                >
                                    <span className="text-3xl mb-2">⭐</span>
                                    <p className="text-text-secondary text-sm">Rata-rata Rating</p>
                                    <p className="text-2xl font-bold text-text-primary">{avgRating}</p>
                                </motion.div>
                            </div>

                            {/* Quick Actions */}
                            <div className="card">
                                <h3 className="font-bold text-text-primary mb-4">Aksi Cepat</h3>
                                <div className="flex flex-wrap gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => { setActiveMenu('products'); openAddModal(); }}
                                        className="btn-primary flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Tambah Produk
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setActiveMenu('products')}
                                        className="btn-secondary flex items-center gap-2"
                                    >
                                        <Package className="w-4 h-4" />
                                        Kelola Produk
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products View */}
                    {activeMenu === 'products' && (
                        <div className="space-y-6">
                            {/* Error Alert */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                    <p className="text-red-700 flex-1">{error}</p>
                                    <button onClick={refreshProducts} className="text-red-500 hover:text-red-700">
                                        <RefreshCw className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}

                            {/* Actions Bar */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="relative flex-1 w-full sm:max-w-md">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                    <input
                                        type="text"
                                        placeholder="Cari produk..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="input-field pl-12 w-full"
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={openAddModal}
                                    className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
                                >
                                    <Plus className="w-5 h-5" />
                                    Tambah Produk
                                </motion.button>
                            </div>

                            {/* Loading State */}
                            {loading && (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                                    <p className="text-text-secondary">Memuat produk...</p>
                                </div>
                            )}

                            {/* Products Table */}
                            {!loading && (
                                <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-background border-b border-border">
                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Produk</th>
                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary hidden md:table-cell">Kategori</th>
                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Harga</th>
                                                    <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary hidden lg:table-cell">Rating</th>
                                                    <th className="text-right px-6 py-4 text-sm font-semibold text-text-primary">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredProducts.map((product, index) => (
                                                    <motion.tr
                                                        key={product.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.03 }}
                                                        className="border-b border-border-light last:border-0 hover:bg-background/50 transition-colors"
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className="flex flex-col">
                                                                <span className="font-semibold text-text-primary">{product.name}</span>
                                                                <span className="text-sm text-text-secondary line-clamp-1">{product.description}</span>
                                                                {product.badge && (
                                                                    <span className="inline-flex mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full w-fit">
                                                                        {product.badge}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 hidden md:table-cell">
                                                            <span className="px-3 py-1 bg-background rounded-full text-sm text-text-secondary">
                                                                {product.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex flex-col">
                                                                <span className="font-semibold text-primary">{formatRupiah(product.price)}</span>
                                                                {product.originalPrice && (
                                                                    <span className="text-xs text-text-muted line-through">
                                                                        {formatRupiah(product.originalPrice)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 hidden lg:table-cell">
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-yellow-500">★</span>
                                                                <span className="text-text-primary font-medium">{product.rating}</span>
                                                                <span className="text-text-muted text-sm">({product.reviews})</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => openEditModal(product)}
                                                                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                                                                >
                                                                    <Pencil className="w-4 h-4" />
                                                                </motion.button>
                                                                {deleteConfirm === product.id ? (
                                                                    <div className="flex items-center gap-1">
                                                                        <motion.button
                                                                            whileHover={{ scale: 1.1 }}
                                                                            whileTap={{ scale: 0.9 }}
                                                                            onClick={() => handleDelete(product.id)}
                                                                            disabled={isDeleting === product.id}
                                                                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-500 text-white disabled:opacity-50"
                                                                        >
                                                                            {isDeleting === product.id ? (
                                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                                            ) : (
                                                                                <Trash2 className="w-4 h-4" />
                                                                            )}
                                                                        </motion.button>
                                                                        <motion.button
                                                                            whileHover={{ scale: 1.1 }}
                                                                            whileTap={{ scale: 0.9 }}
                                                                            onClick={() => setDeleteConfirm(null)}
                                                                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600"
                                                                        >
                                                                            <X className="w-4 h-4" />
                                                                        </motion.button>
                                                                    </div>
                                                                ) : (
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        onClick={() => setDeleteConfirm(product.id)}
                                                                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </motion.button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {filteredProducts.length === 0 && !loading && (
                                        <div className="text-center py-12">
                                            <Package className="w-12 h-12 text-text-muted mx-auto mb-4" />
                                            <p className="text-text-secondary">
                                                {searchQuery ? 'Tidak ada produk ditemukan' : 'Belum ada produk. Tambahkan produk pertama!'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Analytics View */}
                    {activeMenu === 'analytics' && (
                        <div className="card text-center py-12">
                            <BarChart3 className="w-16 h-16 text-text-muted mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-text-primary mb-2">Analitik</h3>
                            <p className="text-text-secondary">Fitur analitik akan segera hadir!</p>
                        </div>
                    )}

                    {/* Settings View */}
                    {activeMenu === 'settings' && (
                        <div className="card text-center py-12">
                            <Settings className="w-16 h-16 text-text-muted mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-text-primary mb-2">Pengaturan</h3>
                            <p className="text-text-secondary">Fitur pengaturan akan segera hadir!</p>
                        </div>
                    )}
                </main>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => !isSubmitting && setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-border">
                                <h3 className="text-xl font-bold text-text-primary">
                                    {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                                </h3>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => !isSubmitting && setIsModalOpen(false)}
                                    disabled={isSubmitting}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-background text-text-secondary transition-colors disabled:opacity-50"
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Nama Produk *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Contoh: ProDesign Suite"
                                        className="input-field"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Deskripsi *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Deskripsi singkat tentang produk..."
                                        rows={3}
                                        className="textarea-field"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-2">
                                            Harga (Rp) *
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="749000"
                                            className="input-field"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-2">
                                            Harga Asli (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.originalPrice}
                                            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                            placeholder="Opsional"
                                            className="input-field"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-2">
                                            Kategori *
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="input-field"
                                            disabled={isSubmitting}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-2">
                                            Badge
                                        </label>
                                        <select
                                            value={formData.badge}
                                            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                            className="input-field"
                                            disabled={isSubmitting}
                                        >
                                            {badges.map(badge => (
                                                <option key={badge} value={badge}>{badge || 'Tidak ada'}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-2">
                                            Rating (1-5)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            step="0.1"
                                            value={formData.rating}
                                            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                            className="input-field"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-2">
                                            Jumlah Review
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.reviews}
                                            onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                                            className="input-field"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        disabled={isSubmitting}
                                        className="btn-secondary flex-1 disabled:opacity-50"
                                    >
                                        Batal
                                    </button>
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                                        className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Logout Confirmation Modal */}
            <AnimatePresence>
                {showLogoutConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowLogoutConfirm(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6"
                        >
                            <div className="text-center">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <LogOut className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-bold text-text-primary mb-2">Keluar dari Dashboard?</h3>
                                <p className="text-text-secondary text-sm mb-6">
                                    Kamu akan keluar dari sesi ini dan perlu login kembali untuk mengakses dashboard.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowLogoutConfirm(false)}
                                        className="btn-secondary flex-1"
                                    >
                                        Batal
                                    </button>
                                    <motion.button
                                        onClick={handleLogout}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl transition-colors"
                                    >
                                        Ya, Keluar
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
