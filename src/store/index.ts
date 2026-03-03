import { create } from 'zustand';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  type: 'rank' | 'kit' | 'crate' | 'offer';
};

export type Currency = 'USD' | 'EUR' | 'INR' | 'DRM';

enum ExchangeRates {
  USD = 1,
  EUR = 0.92,
  INR = 83.12,
  DRM = 3.67,
}

enum CurrencySymbols {
  USD = '$',
  EUR = '€',
  INR = '₹',
  DRM = 'Ð',
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    });
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },
  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
      ),
    }));
  },
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  clearCart: () => set({ items: [] }),
  get total() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));

interface CurrencyState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInUSD: number) => number;
  formatPrice: (priceInUSD: number) => string;
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: 'USD',
  setCurrency: (currency) => set({ currency }),
  convertPrice: (priceInUSD) => {
    const exchangeRate = ExchangeRates[get().currency];
    return Math.round(priceInUSD * exchangeRate * 100) / 100;
  },
  formatPrice: (priceInUSD) => {
    const currency = get().currency;
    const convertedPrice = get().convertPrice(priceInUSD);
    const symbol = CurrencySymbols[currency];
    return `${symbol} ${convertedPrice.toFixed(2)}`;
  },
}));

interface UserState {
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  username: null,
  login: (username) => set({ username }),
  logout: () => set({ username: null }),
}));
