import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ProductDB {
    id: number;
    name: string;
    description: string;
    price: number;
    original_price: number | null;
    rating: number;
    reviews: number;
    category: string;
    badge: string | null;
    created_at: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    category: string;
    badge?: string;
}

// Convert database format to frontend format
export function dbToProduct(db: ProductDB): Product {
    return {
        id: db.id,
        name: db.name,
        description: db.description,
        price: db.price,
        originalPrice: db.original_price || undefined,
        rating: db.rating,
        reviews: db.reviews,
        category: db.category,
        badge: db.badge || undefined,
    };
}

// Convert frontend format to database format
export function productToDb(product: Omit<Product, 'id'>): Omit<ProductDB, 'id' | 'created_at'> {
    return {
        name: product.name,
        description: product.description,
        price: product.price,
        original_price: product.originalPrice || null,
        rating: product.rating,
        reviews: product.reviews,
        category: product.category,
        badge: product.badge || null,
    };
}
