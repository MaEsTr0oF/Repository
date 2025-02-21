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
  favoriteItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  addToFavorite: (product: Product) => void;
  removeFromFavorite: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  isInFavorites: (product: Product) => boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingProduct = prev.find(item => 
        item.imagesrc === product.imagesrc && 
        item.label === product.label && 
        item.text === product.text &&
        item.cost === product.cost
      );

      if (existingProduct) {
        return prev.map(item =>
          item.id === existingProduct.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
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

  const addToFavorite = (product: Product) => {
    setFavoriteItems(prev => {
      const existingProduct = prev.find(item => 
        item.label === product.label && 
        item.cost === product.cost && 
        item.text === product.text
      );

      if (existingProduct) {
        return prev.filter(item => item.id !== existingProduct.id);
      }

      return [...prev, { ...product, id: Date.now().toString() }];
    });
  };

  const removeFromFavorite = (productId: string) => {
    setFavoriteItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInFavorites = (product: Product) => {
    return favoriteItems.some(item => 
      item.label === product.label && 
      item.cost === product.cost && 
      item.text === product.text
    );
  };

  return (
    <ShopContext.Provider value={{
      cartItems,
      compareItems,
      favoriteItems,
      addToCart,
      removeFromCart,
      addToCompare,
      removeFromCompare,
      addToFavorite,
      removeFromFavorite,
      updateCartItemQuantity,
      isInFavorites
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