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
    article?: string;
    size?: string;
    text?: string;
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
        image: "/img/Cables/image1.jpg"
    },
    {
        id: "cable10",
        name: "Кабель управления",
        cost: "10.61 ₽",
        manufacturer: "Uncomtech",
        category: "control",
        image: "/img/Cables/image12.jpg"
    },
    {
        id: "cable11",
        name: "Монтажный универсальный кабель",
        cost: "10.03 ₽",
        manufacturer: "Спецкабельстрой",
        category: "universal",
        image: "/img/Cables/image-4.jpg"
    },
    {
        id: "cable12",
        name: "Контрольный кабель",
        cost: "10.17 ₽",
        manufacturer: "Кабель Москва",
        category: "control",
        image: "/img/Cables/image-7.jpg"
    },
    {
        id: "cable13",
        name: "Кабель сигнализации и блокировки",
        cost: "10.11 ₽",
        manufacturer: "Камкабель",
        category: "signal",
        image: "/img/Cables/image.jpg"
    },
    {
        id: "cable14",
        name: "Оптический кабель",
        cost: "0 ₽",
        manufacturer: "Uncomtech",
        category: "optical",
        image: "/img/Cables/image-2.jpg"
    },
    {
        id: "cable15",
        name: "Судовой кабель",
        cost: "10.2 ₽",
        manufacturer: "Спецкабельстрой",
        category: "marine",
        image: "/img/Cables/image-5.jpg"
    },
    {
        id: "cable16",
        name: "Симметричный кабель",
        cost: "10.21 ₽",
        manufacturer: "Кабель Москва",
        category: "symmetric",
        image: "/img/Cables/image-8.jpg"
    },
    {
        id: "cable17",
        name: "Кабель местной связи",
        cost: "10.53 ₽",
        manufacturer: "Камкабель",
        category: "local",
        image: "/img/Cables/image-1.jpg"
    },
    {
        id: "cable18",
        name: "Телефонный кабель",
        cost: "11.32 ₽",
        manufacturer: "Uncomtech",
        category: "phone",
        image: "/img/Cables/image-3.jpg"
    },
    {
        id: "cable19",
        name: "Коаксиальный кабель",
        cost: "10.37 ₽",
        manufacturer: "Спецкабельстрой",
        category: "coaxial",
        image: "/img/Cables/image-6.jpg"
    },
    {
        id: "cable20",
        name: "Кабель из полимерных композиций",
        cost: "14.4 ₽",
        manufacturer: "Кабель Москва",
        category: "polymer",
        image: "/img/Cables/image-9.jpg"
    },
    {
        id: "cable21",
        name: "Lan-кабель",
        cost: "10.1 ₽",
        manufacturer: "Камкабель",
        category: "lan",
        image: "/img/Cables/image-10.jpg"
    },
    {
        id: "cable22",
        name: "Провод",
        cost: "10.03 ₽",
        manufacturer: "Uncomtech",
        category: "wire",
        image: "/img/Cables/image-11.jpg"
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
        setFilterOptions(prev => ({
            ...prev,
            sortType
        }));

        const filtered = [...filteredProducts];

        switch (sortType) {
            case 'price-asc':
                filtered.sort((a, b) => parseFloat(a.cost.replace(/[^\d.,]/g, '').replace(',', '.')) - parseFloat(b.cost.replace(/[^\d.,]/g, '').replace(',', '.')));
                break;
            case 'price-desc':
                filtered.sort((a, b) => parseFloat(b.cost.replace(/[^\d.,]/g, '').replace(',', '.')) - parseFloat(a.cost.replace(/[^\d.,]/g, '').replace(',', '.')));
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    };
    
    // Применяем фильтры при изменении опций фильтрации
    useEffect(() => {
        applyFilters();
    }, [filterOptions]);
    
    // Загрузка данных из localStorage при инициализации
    useEffect(() => {
        try {
            // Загрузка корзины
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                if (Array.isArray(parsedCart)) {
                    setCartItems(parsedCart);
                    console.log('Корзина загружена из localStorage:', parsedCart);
                }
            }
            
            // Загрузка списка сравнения
            const savedCompare = localStorage.getItem('compare');
            if (savedCompare) {
                const parsedCompare = JSON.parse(savedCompare);
                if (Array.isArray(parsedCompare)) {
                    setCompareItems(parsedCompare);
                    console.log('Список сравнения загружен из localStorage:', parsedCompare);
                }
            }
            
            // Загрузка избранного
            const savedFavorites = localStorage.getItem('favorites');
            if (savedFavorites) {
                const parsedFavorites = JSON.parse(savedFavorites);
                if (Array.isArray(parsedFavorites)) {
                    setFavorites(parsedFavorites);
                    console.log('Избранное загружено из localStorage:', parsedFavorites);
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
            console.log('Корзина сохранена в localStorage:', cartItems);
        } catch (error) {
            console.error('Ошибка при сохранении корзины в localStorage:', error);
        }
    }, [cartItems]);
    
    // Сохранение списка сравнения в localStorage при изменении
    useEffect(() => {
        try {
            localStorage.setItem('compare', JSON.stringify(compareItems));
            console.log('Список сравнения сохранен в localStorage:', compareItems);
        } catch (error) {
            console.error('Ошибка при сохранении списка сравнения в localStorage:', error);
        }
    }, [compareItems]);
    
    // Сохранение избранного в localStorage при изменении
    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
            console.log('Избранное сохранено в localStorage:', favorites);
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
                sortProducts,
                applyFilters,
                demoProducts
            }}
        >
            {children}
        </ShopContext.Provider>
    );
}; 