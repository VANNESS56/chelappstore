'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase, Product, ProductDB, dbToProduct, productToDb } from '../lib/supabase';

interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    refreshProducts: () => Promise<void>;
    addProduct: (product: Omit<Product, 'id'>) => Promise<boolean>;
    updateProduct: (id: number, product: Partial<Product>) => Promise<boolean>;
    deleteProduct: (id: number) => Promise<boolean>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch products from Supabase
    const refreshProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) {
                throw fetchError;
            }

            const formattedProducts = (data as ProductDB[]).map(dbToProduct);
            setProducts(formattedProducts);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Gagal memuat produk. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Load products on mount
    useEffect(() => {
        refreshProducts();
    }, [refreshProducts]);

    // Add new product
    const addProduct = async (product: Omit<Product, 'id'>): Promise<boolean> => {
        try {
            setError(null);
            const dbProduct = productToDb(product);

            const { data, error: insertError } = await supabase
                .from('products')
                .insert([dbProduct])
                .select()
                .single();

            if (insertError) {
                throw insertError;
            }

            // Add to local state
            const newProduct = dbToProduct(data as ProductDB);
            setProducts(prev => [newProduct, ...prev]);
            return true;
        } catch (err) {
            console.error('Error adding product:', err);
            setError('Gagal menambahkan produk. Silakan coba lagi.');
            return false;
        }
    };

    // Update product
    const updateProduct = async (id: number, updates: Partial<Product>): Promise<boolean> => {
        try {
            setError(null);

            // Convert updates to DB format
            const dbUpdates: Partial<ProductDB> = {};
            if (updates.name !== undefined) dbUpdates.name = updates.name;
            if (updates.description !== undefined) dbUpdates.description = updates.description;
            if (updates.price !== undefined) dbUpdates.price = updates.price;
            if (updates.originalPrice !== undefined) dbUpdates.original_price = updates.originalPrice;
            if (updates.rating !== undefined) dbUpdates.rating = updates.rating;
            if (updates.reviews !== undefined) dbUpdates.reviews = updates.reviews;
            if (updates.category !== undefined) dbUpdates.category = updates.category;
            if (updates.badge !== undefined) dbUpdates.badge = updates.badge || null;

            const { error: updateError } = await supabase
                .from('products')
                .update(dbUpdates)
                .eq('id', id);

            if (updateError) {
                throw updateError;
            }

            // Update local state
            setProducts(prev => prev.map(p =>
                p.id === id ? { ...p, ...updates } : p
            ));
            return true;
        } catch (err) {
            console.error('Error updating product:', err);
            setError('Gagal memperbarui produk. Silakan coba lagi.');
            return false;
        }
    };

    // Delete product
    const deleteProduct = async (id: number): Promise<boolean> => {
        try {
            setError(null);

            const { error: deleteError } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (deleteError) {
                throw deleteError;
            }

            // Remove from local state
            setProducts(prev => prev.filter(p => p.id !== id));
            return true;
        } catch (err) {
            console.error('Error deleting product:', err);
            setError('Gagal menghapus produk. Silakan coba lagi.');
            return false;
        }
    };

    return (
        <ProductContext.Provider value={{
            products,
            loading,
            error,
            refreshProducts,
            addProduct,
            updateProduct,
            deleteProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}

export type { Product };
