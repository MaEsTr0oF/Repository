import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Типы и интерфейсы
export interface Product {
    id: string;
    baseId?: string;
    name: string;
    cost: string;
    quantity?: number;
    image?: string;
    manufacturer?: string;
    category?: string;
    rating?: number;
}

export interface FavoriteProduct extends Product {
    image?: string;
}

export interface FilterOptions {
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    manufacturer?: string;
    searchQuery?: string;
    sortType?: SortType;
}

export type SortType = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc' | '';

export interface ShopContextType {
    cartItems: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    compareItems: Product[];
    addToCompare: (product: Product) => void;
    removeFromCompare: (id: string) => void;
    clearCompare: () => void;
    favorites: FavoriteProduct[];
    addToFavorite: (product: FavoriteProduct) => void;
    removeFavorite: (id: string) => void;
    isInFavorites: (id: string) => boolean;
    clearFavorites: () => void;
    filteredProducts: Product[];
    searchProducts: (query: string) => void;
    updateFilter: (key: keyof FilterOptions, value: string | number) => void;
    resetFilters: () => void;
    filterOptions: FilterOptions;
    sortProducts: (sortType: SortType) => void;
    applyFilters: () => void;
    demoProducts: Product[];
}

// Создаем контекст
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Хук для использования контекста
export const useShop = (): ShopContextType => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context;
};

// Пример данных товаров для демонстрации
const demoProducts: Product[] = [
    // Добавляем все товары из AppCables
    {
        id: "cable9",
        name: "Силовой кабель",
        cost: "10.26 ₽",
        manufacturer: "Камкабель",
        category: "power",
        image: "/img/Cables/image1.jpg",
        rating: 4.2
    },
    {
        id: "cable10",
        name: "Кабель управления",
        cost: "10.61 ₽",
        manufacturer: "Uncomtech",
        category: "control",
        image: "/img/Cables/image12.jpg",
        rating: 4.5
    },
    {
        id: "cable11",
        name: "Монтажный универсальный кабель",
        cost: "10.03 ₽",
        manufacturer: "Спецкабельстрой",
        category: "universal",
        image: "/img/Cables/image-4.jpg",
        rating: 3.8
    },
    {
        id: "cable12",
        name: "Контрольный кабель",
        cost: "10.17 ₽",
        manufacturer: "Кабель Москва",
        category: "control",
        image: "/img/Cables/image-7.jpg",
        rating: 4.1
    },
    {
        id: "cable13",
        name: "Кабель сигнализации и блокировки",
        cost: "10.11 ₽",
        manufacturer: "Камкабель",
        category: "signal",
        image: "/img/Cables/image.jpg",
        rating: 4.3
    },
    {
        id: "cable14",
        name: "Оптический кабель",
        cost: "0 ₽",
        manufacturer: "Uncomtech",
        category: "optical",
        image: "/img/Cables/image-2.jpg",
        rating: 4.7
    },
    {
        id: "cable15",
        name: "Судовой кабель",
        cost: "10.2 ₽",
        manufacturer: "Спецкабельстрой",
        category: "marine",
        image: "/img/Cables/image-5.jpg",
        rating: 3.9
    },
    {
        id: "cable16",
        name: "Симметричный кабель",
        cost: "10.21 ₽",
        manufacturer: "Кабель Москва",
        category: "symmetric",
        image: "/img/Cables/image-8.jpg",
        rating: 4.4
    },
    {
        id: "cable17",
        name: "Кабель местной связи",
        cost: "10.53 ₽",
        manufacturer: "Камкабель",
        category: "local",
        image: "/img/Cables/image-1.jpg",
        rating: 4.2
    },
    {
        id: "cable18",
        name: "Телефонный кабель",
        cost: "11.32 ₽",
        manufacturer: "Uncomtech",
        category: "phone",
        image: "/img/Cables/image-3.jpg",
        rating: 4.0
    },
    {
        id: "cable19",
        name: "Коаксиальный кабель",
        cost: "10.37 ₽",
        manufacturer: "Спецкабельстрой",
        category: "coaxial",
        image: "/img/Cables/image-6.jpg",
        rating: 4.6
    },
    {
        id: "cable20",
        name: "Кабель из полимерных композиций",
        cost: "14.4 ₽",
        manufacturer: "Кабель Москва",
        category: "polymer",
        image: "/img/Cables/image-9.jpg",
        rating: 4.3
    },
    {
        id: "cable21",
        name: "Lan-кабель",
        cost: "10.1 ₽",
        manufacturer: "Камкабель",
        category: "lan",
        image: "/img/Cables/image-10.jpg",
        rating: 4.5
    },
    {
        id: "cable22",
        name: "Провод",
        cost: "10.03 ₽",
        manufacturer: "Uncomtech",
        category: "wire",
        image: "/img/Cables/image-11.jpg",
        rating: 4.1
    }
];

// Провайдер контекста
interface ShopProviderProps {
    children: ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
    // Состояние для корзины
    const [cartItems, setCartItems] = useState<Product[]>([]);
    
    // Состояние для сравнения
    const [compareItems, setCompareItems] = useState<Product[]>([]);
    
    // Состояние для избранного
    const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
    
    // Состояние для фильтров и отфильтрованных товаров
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        minPrice: 0,
        maxPrice: 10000,
        category: '',
        manufacturer: '',
        searchQuery: '',
        sortType: ''
    });
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(demoProducts);
    
    // Применение фильтров к товарам
    const applyFilters = () => {
        let filtered = [...demoProducts];
        
        // Фильтрация по цене
        if (filterOptions.minPrice !== undefined || filterOptions.maxPrice !== undefined) {
            filtered = filtered.filter(product => {
                const price = parseFloat(product.cost.replace(/[^\d.-]/g, ''));
                return (
                    (filterOptions.minPrice === undefined || price >= filterOptions.minPrice) &&
                    (filterOptions.maxPrice === undefined || price <= filterOptions.maxPrice)
                );
            });
        }
        
        // Фильтрация по категории
        if (filterOptions.category) {
            filtered = filtered.filter(product => product.category === filterOptions.category);
        }
        
        // Фильтрация по производителю
        if (filterOptions.manufacturer) {
            filtered = filtered.filter(product => product.manufacturer === filterOptions.manufacturer);
        }
        
        // Фильтрация по поисковому запросу
        if (filterOptions.searchQuery) {
            const query = filterOptions.searchQuery.toLowerCase();
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(query) ||
                (product.manufacturer && product.manufacturer.toLowerCase().includes(query)) ||
                (product.category && product.category.toLowerCase().includes(query))
            );
        }
        
        // Сортировка
        if (filterOptions.sortType) {
            switch (filterOptions.sortType) {
                case 'price-asc':
                    filtered.sort((a, b) => {
                        const priceA = parseFloat(a.cost.replace(/[^\d.-]/g, ''));
                        const priceB = parseFloat(b.cost.replace(/[^\d.-]/g, ''));
                        return priceA - priceB;
                    });
                    break;
                case 'price-desc':
                    filtered.sort((a, b) => {
                        const priceA = parseFloat(a.cost.replace(/[^\d.-]/g, ''));
                        const priceB = parseFloat(b.cost.replace(/[^\d.-]/g, ''));
                        return priceB - priceA;
                    });
                    break;
                case 'name-asc':
                    filtered.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    filtered.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'rating-desc':
                    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                    break;
            }
        }
        
        setFilteredProducts(filtered);
    };
    
    // Поиск товаров
    const searchProducts = (query: string) => {
        setFilterOptions(prev => ({ ...prev, searchQuery: query }));
    };
    
    // Обновление отдельного фильтра
    const updateFilter = (key: keyof FilterOptions, value: string | number) => {
        setFilterOptions(prev => ({ ...prev, [key]: value }));
    };
    
    // Сброс фильтров
    const resetFilters = () => {
        setFilterOptions({
            minPrice: 0,
            maxPrice: 10000,
            category: '',
            manufacturer: '',
            searchQuery: '',
            sortType: ''
        });
    };
    
    // Сортировка товаров
    const sortProducts = (sortType: SortType) => {
        setFilterOptions(prev => ({ ...prev, sortType }));
    };
    
    // Применяем фильтры при изменении опций фильтрации
    useEffect(() => {
        applyFilters();
    }, [filterOptions]);
    
    // Загрузка корзины из localStorage при инициализации
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
                setCartItems([]);
            }
        }
        
        const savedCompare = localStorage.getItem('compare');
        if (savedCompare) {
            try {
                setCompareItems(JSON.parse(savedCompare));
            } catch (error) {
                console.error('Error loading compare items from localStorage:', error);
                setCompareItems([]);
            }
        }
        
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (error) {
                console.error('Error loading favorites from localStorage:', error);
                setFavorites([]);
            }
        }
    }, []);
    
    // Сохранение корзины в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);
    
    // Сохранение списка сравнения в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('compare', JSON.stringify(compareItems));
    }, [compareItems]);
    
    // Сохранение избранного в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);
    
    // Функция для добавления товара в корзину
    const addToCart = (product: Product) => {
        // Проверка, существует ли уже такой товар (с таким же baseId) в корзине
        if (product.baseId) {
            const existingProductIndex = cartItems.findIndex(item => item.baseId === product.baseId);
            
            if (existingProductIndex !== -1) {
                // Если товар уже есть, обновляем его количество
                const updatedCart = [...cartItems];
                const existingProduct = updatedCart[existingProductIndex];
                updatedCart[existingProductIndex] = {
                    ...existingProduct,
                    quantity: (existingProduct.quantity || 1) + (product.quantity || 1)
                };
                setCartItems(updatedCart);
            } else {
                // Если товара еще нет, добавляем его
                setCartItems([...cartItems, { ...product, quantity: product.quantity || 1 }]);
            }
        } else {
            // Если нет baseId, просто добавляем товар
            setCartItems([...cartItems, { ...product, quantity: product.quantity || 1 }]);
        }
    };
    
    // Функция для удаления товара из корзины
    const removeFromCart = (id: string) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };
    
    // Функция для обновления количества товара в корзине
    const updateQuantity = (id: string, quantity: number) => {
        setCartItems(
            cartItems.map(item => 
                item.id === id ? { ...item, quantity } : item
            )
        );
    };
    
    // Функция для очистки корзины
    const clearCart = () => {
        setCartItems([]);
    };
    
    // Функция для добавления товара в список сравнения
    const addToCompare = (product: Product) => {
        // Проверка, существует ли уже такой товар в списке сравнения
        if (!compareItems.some(item => item.id === product.id)) {
            setCompareItems([...compareItems, product]);
        }
    };
    
    // Функция для удаления товара из списка сравнения
    const removeFromCompare = (id: string) => {
        setCompareItems(compareItems.filter(item => item.id !== id));
    };
    
    // Функция для очистки списка сравнения
    const clearCompare = () => {
        setCompareItems([]);
    };
    
    // Функция для добавления товара в избранное
    const addToFavorite = (product: FavoriteProduct) => {
        // Проверка, существует ли уже такой товар в избранном
        if (!isInFavorites(product.id)) {
            setFavorites([...favorites, product]);
        } else {
            // Если товар уже в избранном, удаляем его
            removeFavorite(product.id);
        }
    };
    
    // Функция для проверки, находится ли товар в избранном
    const isInFavorites = (id: string): boolean => {
        return favorites.some(item => item.id === id);
    };
    
    // Функция для удаления товара из избранного
    const removeFavorite = (id: string) => {
        setFavorites(favorites.filter(item => item.id !== id));
    };
    
    // Функция для очистки избранного
    const clearFavorites = () => {
        setFavorites([]);
    };
    
    // Предоставляем контекст
    return (
        <ShopContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                compareItems,
                addToCompare,
                removeFromCompare,
                clearCompare,
                favorites,
                addToFavorite,
                removeFavorite,
                isInFavorites,
                clearFavorites,
                filteredProducts,
                searchProducts,
                updateFilter,
                resetFilters,
                filterOptions,
                sortProducts,
                applyFilters,
                demoProducts
            }}
        >
            {children}
        </ShopContext.Provider>
    );
}; 