import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

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
    article?: string;
    size?: string;
    text?: string;
    label?: string;
}

export interface FavoriteProduct extends Product {
    image?: string;
}

export interface FilterOptions {
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    searchQuery?: string;
    sortType?: SortType;
}

export type SortType = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | '';

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
    isInFavorites: (idOrProduct: string | Product | FavoriteProduct) => boolean;
    clearFavorites: () => void;
    filteredProducts: Product[];
    searchProducts: (query: string) => void;
    updateFilter: (key: keyof FilterOptions, value: string | number | undefined) => void;
    resetFilters: () => void;
    filterOptions: FilterOptions;
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
    {
        id: "1",
        name: "Силовой кабель",
        cost: "10.260 ₽",
        manufacturer: "Конкорд",
        category: "Кабель",
        label: "Кабель",
        article: "PR001",
        image: "/img/Cables/image1.jpg",
        text: "Для передачи и распределения электроэнергии"
    },
    {
        id: "2",
        name: "Кабель управления",
        cost: "10.610 ₽",
        manufacturer: "Конкорд",
        category: "Кабель",
        label: "Кабель",
        article: "PR002",
        image: "/img/Cables/image12.jpg",
        text: "Для автоматизированных систем и управления технологическими процессами"
    },
    {
        id: "3",
        name: "Монтажный универсальный кабель",
        cost: "10.030 ₽",
        manufacturer: "Конкорд",
        category: "Кабель",
        label: "Кабель",
        article: "PR003",
        image: "/img/Cables/image-4.jpg",
        text: "Универсальное решение для прокладки в различных условиях"
    },
    {
        id: "4",
        name: "Контрольный кабель",
        cost: "10.170 ₽",
        manufacturer: "Конкорд",
        category: "Кабель",
        label: "Кабель",
        article: "PR004",
        image: "/img/Cables/image-7.jpg",
        text: "Для передачи сигналов управления и контроля"
    },
    {
        id: "5",
        name: "Кабель сигнализации и блокировки",
        cost: "10.110 ₽",
        manufacturer: "Конкорд",
        category: "Кабель",
        label: "Кабель",
        article: "PR005",
        image: "/img/Cables/image.jpg",
        text: "Для систем охранной и пожарной сигнализации"
    },
    {
        id: "6",
        name: "Оптический кабель",
        cost: "По запросу",
        manufacturer: "Конкорд",
        category: "Кабель",
        label: "Кабель",
        article: "PR006",
        image: "/img/Cables/image-2.jpg",
        text: "Для высокоскоростной передачи данных"
    },
    {
        id: "7",
        name: "Судовой кабель",
        cost: "10.200 ₽",
        manufacturer: "Конкорд",
        category: "Кабель",
        label: "Кабель",
        article: "PR007",
        image: "/img/Cables/image-5.jpg",
        text: "Для судостроения и эксплуатации в условиях повышенной влажности"
    },
    {
        id: "8",
        name: "Симметричный кабель",
        cost: "10.210 ₽",
        manufacturer: "Конкорд",
        category: "Кабель",
        label: "Кабель",
        article: "PR008",
        image: "/img/Cables/image-8.jpg",
        text: "Для передачи низкочастотных сигналов"
    },
    {
        id: "9",
        name: "Кабель местной связи",
        cost: "10.530 ₽",
        manufacturer: "Конкорд",
        category: "Кабель",
        label: "Кабель",
        article: "PR009",
        image: "/img/Cables/image-1.jpg",
        text: "Для телефонных сетей и передачи сигналов"
    },
    {
        id: "10",
        name: "Телефонный кабель",
        cost: "11.320 ₽",
        manufacturer: "Конкорд",
        category: "Кабель",
        label: "Кабель",
        article: "PR010",
        image: "/img/Cables/image-3.jpg",
        text: "Для передачи голоса и данных"
    },
    {
        id: "11",
        name: "Коаксиальный кабель",
        cost: "10.370 ₽",
        manufacturer: "Конкорд",
        category: "Кабель",
        label: "Кабель",
        article: "PR011",
        image: "/img/Cables/image-6.jpg",
        text: "Для передачи телевизионных сигналов и интернета"
    },
    {
        id: "12",
        name: "Кабель из полимерных композиций",
        cost: "14.400 ₽",
        manufacturer: "Конкорд",
        category: "Кабель",
        label: "Кабель",
        article: "PR012",
        image: "/img/Cables/image-9.jpg",
        text: "Для сложных эксплуатационных условий"
    },
    {
        id: "13",
        name: "Lan-кабель",
        cost: "10.100 ₽",
        manufacturer: "Конкорд",
        category: "Кабель",
        label: "Кабель",
        article: "PR013",
        image: "/img/Cables/image-10.jpg",
        text: "Для компьютерных сетей"
    },
    {
        id: "14",
        name: "Провод",
        cost: "10.030 ₽",
        manufacturer: "Конкорд",
        category: "Провод",
        label: "Провод",
        article: "PR014",
        image: "/img/Cables/image-11.jpg",
        text: "Для подключения электрических приборов"
    },
    {
        id: "15",
        name: "Низковольтное оборудование",
        cost: "По запросу",
        manufacturer: "ElectroTech",
        category: "Низковольтное оборудование",
        label: "Низковольтное оборудование",
        article: "ET001",
        image: "/img/Electric/image.jpg",
        text: "Автоматические выключатели, УЗО, реле"
    },
    {
        id: "16",
        name: "Системы безопасности",
        cost: "По запросу",
        manufacturer: "SecureTech",
        category: "Системы безопасности",
        label: "Системы безопасности",
        article: "ST001",
        image: "/img/Electric/image1.jpg",
        text: "Оборудование для охранной и пожарной сигнализации"
    },
    {
        id: "17",
        name: "Материалы для прокладки кабеля",
        cost: "По запросу",
        manufacturer: "CableTech",
        category: "Материалы для прокладки кабеля",
        label: "Материалы для прокладки кабеля",
        article: "MT001",
        image: "/img/Electric/image2.jpg",
        text: "Кабель-каналы, лотки, крепежи"
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
        searchQuery: '',
        sortType: ''
    });
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(demoProducts);
    
    // Поиск товаров
    const searchProducts = (query: string) => {
        setFilterOptions(prev => {
            const newOptions = { ...prev, searchQuery: query };
            const filtered = applyFiltersWithOptions(newOptions);
            setFilteredProducts(filtered);
            return newOptions;
        });
    };
    
    // Обновление отдельного фильтра
    const updateFilter = (key: keyof FilterOptions, value: string | number | undefined) => {
        setFilterOptions(prev => {
            const newOptions = { ...prev, [key]: value };
            
            // Если обновляется категория, сбрасываем поисковый запрос и сортировку
            if (key === 'category') {
                newOptions.searchQuery = '';
                newOptions.sortType = undefined;
            }
            
            const filtered = applyFiltersWithOptions(newOptions);
            setFilteredProducts(filtered);
            return newOptions;
        });
    };

    // Применение фильтров
    const applyFilters = useCallback(() => {
        setFilteredProducts(applyFiltersWithOptions(filterOptions));
    }, [filterOptions]);

    // Вспомогательная функция для применения фильтров
    const applyFiltersWithOptions = (options: FilterOptions) => {
        let filtered = [...demoProducts];
        
        // Фильтрация по цене
        if (options.maxPrice !== undefined) {
            filtered = filtered.filter(product => {
                if (product.cost === "По запросу") return true;
                const price = parseFloat(product.cost.replace(/[^\d.]/g, '')) * 1000;
                return price <= options.maxPrice!;
            });
        }
        
        // Фильтрация по категории
        if (options.category) {
            filtered = filtered.filter(product => 
                product.category?.toLowerCase() === options.category?.toLowerCase()
            );
        }
        
        // Фильтрация по поисковому запросу
        if (options.searchQuery) {
            const query = options.searchQuery.toLowerCase();
            filtered = filtered.filter(product => {
                const searchFields = [
                    product.name,
                    product.label,
                    product.manufacturer,
                    product.category,
                    product.article,
                    product.text
                ];
                
                return searchFields.some(field => 
                    field && field.toLowerCase().includes(query)
                );
            });
        }
        
        // Сортировка
        if (options.sortType) {
            filtered.sort((a, b) => {
                const priceA = parseFloat(a.cost.replace(/[^\d.-]/g, ''));
                const priceB = parseFloat(b.cost.replace(/[^\d.-]/g, ''));
                
                switch (options.sortType) {
                    case 'price-asc':
                        return priceA - priceB;
                    case 'price-desc':
                        return priceB - priceA;
                    case 'name-asc':
                        return (a.label || a.name).localeCompare(b.label || b.name);
                    case 'name-desc':
                        return (b.label || b.name).localeCompare(a.label || a.name);
                    default:
                        return 0;
                }
            });
        }
        
        return filtered;
    };
    
    // Сброс фильтров
    const resetFilters = () => {
        const defaultOptions: FilterOptions = {
            minPrice: 0,
            maxPrice: 10000,
            category: '',
            searchQuery: '',
            sortType: undefined
        };
        
        setFilterOptions(defaultOptions);
        setFilteredProducts(applyFiltersWithOptions(defaultOptions));
    };
    
    // Загрузка данных из localStorage при инициализации
    useEffect(() => {
        try {
            // Загрузка корзины
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                if (Array.isArray(parsedCart)) {
                    setCartItems(parsedCart);
                }
            }
            
            // Загрузка списка сравнения
            const savedCompare = localStorage.getItem('compare');
            if (savedCompare) {
                const parsedCompare = JSON.parse(savedCompare);
                if (Array.isArray(parsedCompare)) {
                    setCompareItems(parsedCompare);
                }
            }
            
            // Загрузка избранного
            const savedFavorites = localStorage.getItem('favorites');
            if (savedFavorites) {
                const parsedFavorites = JSON.parse(savedFavorites);
                if (Array.isArray(parsedFavorites)) {
                    setFavorites(parsedFavorites);
                }
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных из localStorage:', error);
        }
    }, []);
    
    // Сохранение корзины в localStorage при изменении
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Ошибка при сохранении корзины в localStorage:', error);
        }
    }, [cartItems]);
    
    // Сохранение списка сравнения в localStorage при изменении
    useEffect(() => {
        try {
            localStorage.setItem('compare', JSON.stringify(compareItems));
        } catch (error) {
            console.error('Ошибка при сохранении списка сравнения в localStorage:', error);
        }
    }, [compareItems]);
    
    // Сохранение избранного в localStorage при изменении
    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Ошибка при сохранении избранного в localStorage:', error);
        }
    }, [favorites]);
    
    // Функция для добавления товара в корзину
    const addToCart = (product: Product) => {
        try {
            if (!product || !product.id) {
                console.error('Попытка добавить некорректный товар в корзину:', product);
                return;
            }

            // Проверяем, существует ли уже такой товар в корзине по id или baseId
            const existingProductIndex = cartItems.findIndex(item => 
                (product.baseId && item.baseId === product.baseId) || 
                (item.id === product.id) ||
                (item.name === product.name && item.cost === product.cost)
            );
            
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
                setCartItems(prevItems => [...prevItems, { ...product, quantity: product.quantity || 1 }]);
            }
        } catch (error) {
            console.error('Ошибка при добавлении товара в корзину:', error);
        }
    };
    
    // Функция для удаления товара из корзины
    const removeFromCart = (id: string) => {
        try {
            if (!id) {
                console.error('Попытка удалить товар с некорректным id:', id);
                return;
            }
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении товара из корзины:', error);
        }
    };
    
    // Функция для обновления количества товара в корзине
    const updateQuantity = (id: string, quantity: number) => {
        try {
            if (!id) {
                console.error('Попытка обновить количество товара с некорректным id:', id);
                return;
            }

            if (quantity <= 0) {
                // Если количество меньше или равно 0, удаляем товар из корзины
                removeFromCart(id);
                return;
            }
            
            setCartItems(prevItems =>
                prevItems.map(item => 
                    item.id === id ? { ...item, quantity } : item
                )
            );
        } catch (error) {
            console.error('Ошибка при обновлении количества товара:', error);
        }
    };
    
    // Функция для очистки корзины
    const clearCart = () => {
        try {
            setCartItems([]);
        } catch (error) {
            console.error('Ошибка при очистке корзины:', error);
        }
    };
    
    // Функция для добавления товара в список сравнения
    const addToCompare = (product: Product) => {
        try {
            if (!product || !product.id) {
                console.error('Попытка добавить некорректный товар в список сравнения:', product);
                return;
            }

            // Проверка, существует ли уже такой товар в списке сравнения
            if (!compareItems.some(item => item.id === product.id)) {
                setCompareItems(prevItems => [...prevItems, product]);
            }
        } catch (error) {
            console.error('Ошибка при добавлении товара в список сравнения:', error);
        }
    };
    
    // Функция для удаления товара из списка сравнения
    const removeFromCompare = (id: string) => {
        try {
            if (!id) {
                console.error('Попытка удалить товар с некорректным id из списка сравнения:', id);
                return;
            }
            setCompareItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении товара из списка сравнения:', error);
        }
    };
    
    // Функция для очистки списка сравнения
    const clearCompare = () => {
        try {
            setCompareItems([]);
        } catch (error) {
            console.error('Ошибка при очистке списка сравнения:', error);
        }
    };
    
    // Функция для добавления товара в избранное
    const addToFavorite = (product: FavoriteProduct) => {
        try {
            if (!product || !product.id) {
                console.error('Попытка добавить некорректный товар в избранное:', product);
                return;
            }

            // Проверка, существует ли уже такой товар в избранном
            if (!isInFavorites(product.id)) {
                setFavorites(prevItems => [...prevItems, product]);
            } else {
                // Если товар уже в избранном, удаляем его
                removeFavorite(product.id);
            }
        } catch (error) {
            console.error('Ошибка при добавлении товара в избранное:', error);
        }
    };
    
    // Функция для проверки, находится ли товар в избранном
    const isInFavorites = (idOrProduct: string | Product | FavoriteProduct): boolean => {
        try {
            if (typeof idOrProduct === 'string') {
                return favorites.some(item => item.id === idOrProduct);
            } else if (idOrProduct && idOrProduct.id) {
                return favorites.some(item => item.id === idOrProduct.id);
            }
            return false;
        } catch (error) {
            console.error('Ошибка при проверке наличия товара в избранном:', error);
            return false;
        }
    };
    
    // Функция для удаления товара из избранного
    const removeFavorite = (id: string) => {
        try {
            if (!id) {
                console.error('Попытка удалить товар с некорректным id из избранного:', id);
                return;
            }
            setFavorites(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении товара из избранного:', error);
        }
    };
    
    // Функция для очистки избранного
    const clearFavorites = () => {
        try {
            setFavorites([]);
        } catch (error) {
            console.error('Ошибка при очистке избранного:', error);
        }
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
                applyFilters,
                demoProducts
            }}
        >
            {children}
        </ShopContext.Provider>
    );
}; 