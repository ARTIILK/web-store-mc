import React, { createContext, useContext, useState, useEffect } from 'react';
import { StoreItem, parseCSV } from '../utils/csvParser';

interface CartItem extends StoreItem {
    quantity: number;
}

interface StoreContextType {
    products: StoreItem[];
    categories: string[];
    cart: CartItem[];
    addToCart: (product: StoreItem) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, delta: number) => void;
    isCartOpen: boolean;
    setCartOpen: (open: boolean) => void;
    loading: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<StoreItem[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setCartOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await parseCSV('/src/data/store.csv');
                setProducts(data);
            } catch (error) {
                console.error('Failed to load store data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const categories = Array.from(new Set(products.map(p => p.category)));

    const addToCart = (product: StoreItem) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setCartOpen(true);
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    return (
        <StoreContext.Provider value={{
            products, categories, cart, addToCart, removeFromCart, updateQuantity,
            isCartOpen, setCartOpen, loading
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) throw new Error('useStore must be used within StoreProvider');
    return context;
};
