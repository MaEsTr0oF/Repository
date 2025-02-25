import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import { useShop, Product as ShopProduct, SortType } from '../../../context/ShopContext';
import AddToCartAnimation from '../../AddToCartAnimation/AddToCartAnimation';
import ImageModal from '../../ImageModal/ImageModal';
import styles from "./CabelFilter.module.css";
import image from '/img/header/heart.png';
import image1 from '/img/header/heart1.png';
import filterIcon from '/img/header/stats.png';
import closeIcon from '/img/header/card.png';
import PageTitle from '../../PageTitle/PageTitle';

interface Manufacturer {
    id: string;
    name: string;
}

// Расширим интерфейс Product, чтобы включить все необходимые поля
interface Product extends ShopProduct {
    title?: string;
    label?: string;
    text?: string;
    price?: number;
    imagesrc?: string;
    size?: string;
    article?: string;
}

// Список производителей для фильтра
const manufacturers: Manufacturer[] = [
    { id: 'kamkabel', name: 'Камкабель' },
    { id: 'uncomtech', name: 'Uncomtech' },
    { id: 'spetskoelstroi', name: 'Спецкабельстрой' },
    { id: 'kabelmoscow', name: 'Кабель Москва' },
];

const CabelFilter: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { 
        addToCart, 
        addToCompare, 
        addToFavorite, 
        filteredProducts, 
        filterOptions, 
        updateFilter, 
        resetFilters, 
        searchProducts,
        sortProducts,
        applyFilters
    } = useShop();
    
    // Получаем выбранную категорию из URL параметров - используем useParams
    const { category: urlCategory } = useParams<{ category?: string }>();
    const selectedCategory = urlCategory ? decodeURIComponent(urlCategory) : '';
    
    const cleanup = () => {
        console.log('CabelFilter: Очистка состояния');
        // Не вызываем resetFilters() здесь, так как это может создать цикл
        setSearchValue('');
        setRangeValue(20);
        setMobileFiltersOpen(false);
    };

    // Инициализация при монтировании и сброс при размонтировании
    useEffect(() => {
        console.log('CabelFilter: Компонент монтируется, selectedCategory =', selectedCategory);
        
        // При монтировании сбрасываем локальные состояния
        setSearchValue('');
        setRangeValue(20);
        setMobileFiltersOpen(false);
        
        // Если у нас есть категория, применяем фильтр
        // Но не сбрасываем фильтры - это должно быть сделано в родительском компоненте
        if (selectedCategory && filterOptions.category !== selectedCategory) {
            console.log('CabelFilter: Применяем фильтр категории:', selectedCategory);
            // Принудительно устанавливаем новый фильтр категории
            updateFilter('category', selectedCategory);
            // Сразу применяем фильтры
            applyFilters();
        }
        
        // При размонтировании очищаем только локальные состояния
        return () => {
            console.log('CabelFilter: Компонент размонтируется, очищаем локальные состояния');
            cleanup();
        };
    }, [selectedCategory, updateFilter, applyFilters, filterOptions.category]);

    // Дополнительный эффект для обработки изменений URL без перемонтирования
    useEffect(() => {
        // Избегаем первого вызова
        const currentPath = location.pathname;
        console.log('CabelFilter: Изменился URL на', currentPath);
        
        // Если мы не на странице категории, ничего не делаем
        if (!currentPath.includes('/catalog/')) return;
        
        // Если у нас есть category в URL и оно не совпадает с текущим фильтром
        if (selectedCategory && filterOptions.category !== selectedCategory) {
            console.log('CabelFilter: Обновляем фильтр категории при изменении URL:', selectedCategory);
            updateFilter('category', selectedCategory);
            applyFilters();
        }
    }, [location.pathname, location.key, selectedCategory, filterOptions.category, updateFilter, applyFilters]);
    
    // Получаем уникальные категории из каталога
    const categories = [...new Set(filteredProducts.map(product => product.category || ''))].filter(Boolean);
    
    const [animatingProducts, setAnimatingProducts] = useState<{[key: string]: boolean}>({});
    const [favoriteProducts, setFavoriteProducts] = useState<{[key: string]: boolean}>({});
    const [animationConfigs, setAnimationConfigs] = useState<{[key: string]: {
        startPosition: { x: number; y: number };
        endPosition: { x: number; y: number };
        type: 'cart' | 'compare';
    }}>({});
    const [rangeValue, setRangeValue] = useState<number>(20);
    const [searchValue, setSearchValue] = useState<string>('');
    const cardRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    // Обновляем поисковый запрос при вводе
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            searchProducts(searchValue);
        }, 500);
        
        return () => clearTimeout(debounceTimer);
    }, [searchValue, searchProducts]);

    // Обработчик изменения диапазона цены
    const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setRangeValue(value);
        // Используем maxPrice как название поля фильтра и значение без умножения
        updateFilter('maxPrice', value);
    };

    // Обработчик изменения категории
    const handleCategoryChange = (category: string) => {
        // Очищаем состояние перед сменой категории
        cleanup();
        
        // Последовательно применяем новый фильтр категории
        updateFilter('category', category);
        applyFilters();
        
        // Переходим на страницу категории
        const encodedCategory = encodeURIComponent(category);
        navigate(`/catalog/${encodedCategory}`, { 
            replace: false // Не заменяем запись в истории, чтобы работала кнопка "Назад"
        });
    };

    // Обработчик изменения сортировки
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        sortProducts(event.target.value as SortType);
    };

    const handleProductClick = (product: Product) => {
        navigate(`/product/${product.id}`, {
            state: {
                productImage: product.image,
                title: product.name,
                description: product.text || `Подробное описание товара ${product.name}. Характеристики и технические данные будут доступны в ближайшее время.`,
                price: product.cost,
                article: product.article || 'Н/Д',
                brand: product.manufacturer || 'КабельОпт',
                deliveryInfo: "Доставка осуществляется по всей России. Оплата при получении или онлайн на сайте."
            }
        });
    };

    const handleAction = (e: React.MouseEvent, product: Product, type: 'cart' | 'compare') => {
        e.stopPropagation();
        
        // Получаем позицию карточки товара
        if (!cardRefs.current[product.id]) return;
        
        const cardEl = cardRefs.current[product.id];
        if (!cardEl) return;
        
        const rect = cardEl.getBoundingClientRect();
        
        // Позиция целевой иконки (корзина или сравнение)
        const targetElement = document.querySelector(
            type === 'cart' 
                ? '[data-cart-icon="true"]' 
                : '[data-compare-icon="true"]'
        );
        
        if (!targetElement) return;
        
        const targetRect = targetElement.getBoundingClientRect();
        
        // Настраиваем анимацию
        setAnimationConfigs(prev => ({
            ...prev,
            [product.id]: {
                startPosition: { x: rect.left, y: rect.top },
                endPosition: { x: targetRect.left + targetRect.width / 2, y: targetRect.top + targetRect.height / 2 },
                type
            }
        }));
        
        // Запускаем анимацию
        setAnimatingProducts(prev => ({
            ...prev,
            [product.id]: true
        }));
        
        // Добавляем товар в корзину или список сравнения
        if (type === 'cart') {
            // Объект для корзины
            addToCart({
                id: product.id,
                name: product.name,
                cost: product.cost,
                image: product.image || ''
            });
        } else {
            // Объект для сравнения
            addToCompare({
                id: product.id,
                name: product.name,
                cost: product.cost,
                image: product.image || ''
            });
        }
    };

    const handleFavoriteClick = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        setFavoriteProducts(prev => ({
            ...prev,
            [product.id]: !prev[product.id]
        }));

        // Создаем объект в соответствии с интерфейсом FavoriteProduct
        addToFavorite({
            id: product.id,
            name: product.name,
            cost: product.cost,
            image: product.image || ''
        });
    };

    const handleImageClick = (e: React.MouseEvent, imageUrl: string) => {
        e.stopPropagation();
        setSelectedImage(imageUrl);
        setIsImageModalOpen(true);
    };

    // Преобразуем отфильтрованные продукты в формат для отображения
    const products: Product[] = filteredProducts.map((product) => {
        // Убираем символ рубля из строки cost, если он там есть
        let costValue = product.cost || '0';
        if (costValue.includes('₽')) {
            costValue = costValue.replace(/₽/g, '').trim();
        }
        
        return {
            id: product.id,
            name: product.name,
            cost: costValue,
            image: product.image || '',
            article: product.article || '',
            size: product.size || ''
        };
    });

    const toggleMobileFilters = () => {
        setMobileFiltersOpen(!mobileFiltersOpen);
    };

    // Обработчик возврата к категориям
    const handleBackToCategories = () => {
        console.log('CabelFilter: Возврат к списку категорий');
        
        // Сбрасываем только локальные состояния перед возвратом
        // resetFilters будет вызван при монтировании CatalogPage
        cleanup(); 
        
        // Используем replace: true, так как это действие "назад"
        navigate('/catalog', { replace: true });
    };

    return (
        <div className={styles.filter}>
            {selectedCategory && (
                <PageTitle title={`Категория: ${selectedCategory}`} />
            )}
            
            {/* Хлебные крошки */}
            <div className={styles.breadcrumbs}>
                <Link to="/" replace>Главная</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link to="/catalog" replace>Каталог</Link>
                {selectedCategory && (
                    <>
                        <span className={styles.breadcrumbSeparator}>/</span>
                        <span className={styles.breadcrumbCurrent}>{selectedCategory}</span>
                    </>
                )}
            </div>
            
            <div className={styles.filter_title}>
                <h2>{selectedCategory ? `Товары категории "${selectedCategory}"` : 'Фильтр продуктов'}</h2>
                <div className={styles.sortAndSearch}>
                    <form className={styles.searchBox} onSubmit={(e) => { e.preventDefault(); searchProducts(searchValue); }}>
                        <input 
                            type="text" 
                            placeholder="Поиск товаров..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button type="submit">Поиск</button>
                    </form>
                    
                    <div className={styles.sortBox}>
                        <select 
                            value={filterOptions.sortType || 'price-asc'} 
                            onChange={handleSortChange}
                        >
                            <option value="price-asc">Сначала дешевле</option>
                            <option value="price-desc">Сначала дороже</option>
                            <option value="name-asc">От А до Я</option>
                            <option value="name-desc">От Я до А</option>
                        </select>
                    </div>
                    
                    <button 
                        className={styles.mobileFilterToggle}
                        onClick={toggleMobileFilters}
                    >
                        <img src={mobileFiltersOpen ? closeIcon : filterIcon} alt="Фильтры" />
                    </button>
                </div>
            </div>
            <div className={styles.filter_body}>
                <div className={`${styles.filter_sidebar} ${mobileFiltersOpen ? styles.mobileSidebarOpen : ''}`}>
                    {selectedCategory && (
                        <button 
                            className={styles.backToCategoriesButton}
                            onClick={handleBackToCategories}
                        >
                            ← Вернуться к категориям
                        </button>
                    )}
                    <div className={styles.filter_section}>
                        <h3>Цена</h3>
                        <div className={styles.priceRange}>
                            <input 
                                type="range" 
                                min="0" 
                                max="20" 
                                step="1"
                                value={rangeValue}
                                onChange={handlePriceRangeChange}
                                className={styles.rangeSlider}
                            />
                            <div className={styles.priceValues}>
                                <span>0 ₽</span>
                                <span>до {rangeValue} ₽</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.filter_section}>
                        <h3>Категории</h3>
                        <div className={styles.checkboxGroup}>
                            {categories.map((category) => (
                                <label key={category} className={styles.checkboxLabel}>
                                    <input 
                                        type="checkbox" 
                                        className={styles.checkbox}
                                        checked={filterOptions.category === category}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    <span className={styles.checkmark}></span>
                                    {category}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className={styles.filter_section}>
                        <h3>Производители</h3>
                        <div className={styles.checkboxGroup}>
                            {manufacturers.map(manufacturer => (
                                <label key={manufacturer.id} className={styles.checkboxLabel}>
                                    <input 
                                        type="checkbox" 
                                        className={styles.checkbox}
                                        onChange={() => updateFilter('manufacturer', manufacturer.id)}
                                        checked={filterOptions.manufacturer === manufacturer.id}
                                    />
                                    <span className={styles.checkmark}></span>
                                    {manufacturer.name}
                                </label>
                            ))}
                        </div>
                    </div>
                    <button 
                        className={styles.resetButton}
                        onClick={resetFilters}
                    >
                        Сбросить все фильтры
                    </button>
                    
                    {mobileFiltersOpen && (
                        <button 
                            className={`${styles.resetButton} ${styles.closeFilters}`}
                            onClick={toggleMobileFilters}
                        >
                            Применить фильтры
                        </button>
                    )}
                </div>
                <div className={styles.filter_cards}>
                    {products.length === 0 ? (
                        <div className={styles.noResults}>
                            <h3>{selectedCategory 
                                ? `Товары в категории "${selectedCategory}" не найдены` 
                                : 'Товары не найдены'}</h3>
                            <p>Попробуйте изменить параметры фильтрации или выбрать другую категорию</p>
                            {selectedCategory && (
                                <button 
                                    className={styles.backToCategoriesButton}
                                    onClick={handleBackToCategories}
                                    style={{ marginTop: '20px', width: 'auto', display: 'inline-block' }}
                                >
                                    ← Вернуться к категориям
                                </button>
                            )}
                        </div>
                    ) : (
                        products.map((product) => {
                            const isFavorite = favoriteProducts[product.id] || false;
                            return (
                                <div 
                                    key={product.id} 
                                    className={styles.card}
                                    ref={(el) => {
                                        if (el) {
                                            cardRefs.current[product.id] = el;
                                        }
                                    }}
                                    onClick={() => handleProductClick(product)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {product.size && (
                                        <div className={styles.size_badge}>{product.size}</div>
                                    )}
                                    <div className={styles.card_image}>
                                        <img 
                                            src={product.image} 
                                            alt={product.name || product.title} 
                                            onClick={(e) => {
                                                e.stopPropagation(); // Предотвращаем всплытие события
                                                handleImageClick(e, product.image || '');
                                            }}
                                            style={{ cursor: 'zoom-in' }}
                                        />
                                        <div 
                                            className={styles.productOverlay}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Предотвращаем двойное срабатывание
                                                handleProductClick(product);
                                            }}
                                        ></div>
                                    </div>
                                    <div 
                                        className={styles.card_title} 
                                        onClick={(e) => {
                                            e.stopPropagation(); // Предотвращаем двойное срабатывание
                                            handleProductClick(product);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <h2>{product.name || product.title}</h2>
                                        <span>Артикул: {product.article || product.text}</span>
                                    </div>
                                    <div className={styles.card_more}>
                                        <h2>{product.cost} ₽</h2>
                                        <button 
                                            className={styles.card_more_button}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Предотвращаем двойное срабатывание
                                                handleProductClick(product);
                                            }}
                                            title="Посмотреть детали товара"
                                        >
                                            Подробнее
                                        </button>
                                        <button 
                                            className={styles.card_more_button}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Предотвращаем двойное срабатывание
                                                handleAction(e, product, 'cart');
                                            }}
                                            title="Добавить в корзину"
                                        >
                                            В корзину
                                        </button>
                                        <div className={styles.card_more_favorive}>
                                            <img 
                                                src={isFavorite ? image1 : image} 
                                                alt="В избранное"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Предотвращаем двойное срабатывание
                                                    handleFavoriteClick(e, product);
                                                }}
                                                title="Добавить в избранное"
                                                style={{ marginRight: '12px' }}
                                            />
                                            <img 
                                                src={filterIcon} 
                                                alt="Сравнить"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Предотвращаем двойное срабатывание
                                                    handleAction(e, product, 'compare');
                                                }}
                                                title="Добавить к сравнению"
                                            />
                                        </div>
                                    </div>

                                    {animatingProducts[product.id] && animationConfigs[product.id] && (
                                        <AddToCartAnimation
                                            startPosition={animationConfigs[product.id].startPosition}
                                            endPosition={animationConfigs[product.id].endPosition}
                                            imageUrl={product.image || ''}
                                            type={animationConfigs[product.id].type}
                                            onComplete={() => {
                                                setAnimatingProducts(prev => ({
                                                    ...prev,
                                                    [product.id]: false
                                                }));
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            
            {/* Модальное окно для отображения изображения на весь экран */}
            <ImageModal 
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                imageUrl={selectedImage || ''}
                altText="Изображение товара"
            />
        </div>
    );
};

export default CabelFilter; 