import { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id?: string;
  imagesrc: string;
  label: string;
  text: string;
  cost: string;
}

interface ShopContextType {
  cartItems: Product[];
  compareItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, { ...product, id: Date.now().toString() }]);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const addToCompare = (product: Product) => {
    setCompareItems(prev => [...prev, { ...product, id: Date.now().toString() }]);
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <ShopContext.Provider value={{
      cartItems,
      compareItems,
      addToCart,
      removeFromCart,
      addToCompare,
      removeFromCompare
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
} 