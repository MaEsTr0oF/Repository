import { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id?: string;
  imagesrc: string;
  label: string;
  text: string;
  cost: string;
  quantity?: number;
}

interface ShopContextType {
  cartItems: Product[];
  compareItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingProduct = prev.find(item => 
        item.label === product.label && 
        item.cost === product.cost && 
        item.text === product.text
      );

      if (existingProduct) {
        return prev.map(item =>
          item.id === existingProduct.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...prev, { ...product, id: Date.now().toString(), quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const addToCompare = (product: Product) => {
    setCompareItems(prev => {
      const existingProduct = prev.find(item => 
        item.label === product.label && 
        item.cost === product.cost && 
        item.text === product.text
      );

      if (existingProduct) {
        return prev;
      }

      return [...prev, { ...product, id: Date.now().toString() }];
    });
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
      removeFromCompare,
      updateCartItemQuantity
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