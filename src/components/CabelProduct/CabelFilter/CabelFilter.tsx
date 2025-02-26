import { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useShop } from '../../../context/ShopContext';
import { Product, CategoryData, AnimationConfig, SortType } from '../../../types/shop.types';
import AddToCartAnimation from '../../AddToCartAnimation/AddToCartAnimation';
import ImageModal from '../../ImageModal/ImageModal';
import styles from './CabelFilter.module.css';
import PageTitle from '../../PageTitle/PageTitle';
import CabelCatalog from '../CabelCatalog/CabelCatalog';

// Импорт иконок
import heartEmpty from '/img/header/heart.png';
import heartFilled from '/img/header/heart1.png';
import compareIcon from '/img/header/stats.png';

const CabelFilter: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { 
        filteredProducts: products,
        filterOptions,
        updateFilter,
        resetFilters,
        addToCart,
        addToCompare,
        addToFavorite,
        isInFavorites,
        applyFilters
    } = useShop();

    // Локальные состояния
    const [searchValue, setSearchValue] = useState('');
    const [priceRange, setPriceRange] = useState<{ value: number }>({ value: 20 });
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [showCategorySelector, setShowCategorySelector] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [activeFilters, setActiveFilters] = useState({
        search: false,
        price: false,
        category: false,
        sort: false
    });

    // Refs для анимации
    const cardRefs = useRef<{ [key: string]: HTMLDivElement }>({});
    const [animatingProducts, setAnimatingProducts] = useState<{ [key: string]: boolean }>({});
    const [animationConfigs, setAnimationConfigs] = useState<{ [key: string]: AnimationConfig }>({});

    // Добавляем ref для секции фильтров
    const filterSectionRef = useRef<HTMLDivElement>(null);

    // Получаем текущую категорию из URL
    const selectedCategory = useMemo(() => {
        const pathParts = location.pathname.split('/');
        return pathParts[pathParts.length - 1] !== 'catalog' ? pathParts[pathParts.length - 1] : '';
    }, [location.pathname]);

    const categories = useMemo<CategoryData[]>(() => [
        {
            image: '/img/CabelCatalog/image13.png',
            label: "Кабель",
            category: "Кабель",
            description: "Широкий выбор кабельной продукции"
        },
        {
            image: '/img/CabelCatalog/image-11.jpg',
            label: "Провод",
            category: "Провод",
            description: "Провода различного сечения"
        },
        {
            image: '/img/CabelCatalog/image1.png',
            label: "Свет",
            category: "Свет",
            description: "Осветительные приборы"
        },
        {
            image: '/img/CabelCatalog/image.jpg',
            label: "Низковольтное оборудование",
            category: "Низковольтное оборудование",
            description: "Надежное оборудование"
        },
        {
            image: '/img/CabelCatalog/image2.png',
            label: "Системы безопасности",
            category: "Системы безопасности",
            description: "Надежное оборудование"
        },
        {
            image: '/img/CabelCatalog/image3.png',
            label: "Материалы для прокладки кабеля",
            category: "Материалы для прокладки кабеля",
            description: "Надежное оборудование"
        }
    ], []);

    // Обработчики событий
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        
        // Устанавливаем таймаут для применения фильтра
        const timeoutId = setTimeout(() => {
            updateFilter('searchQuery', value);
            setActiveFilters(prev => ({ ...prev, search: !!value }));
        }, 300);

        return () => clearTimeout(timeoutId);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilter('searchQuery', searchValue);
        setActiveFilters(prev => ({ ...prev, search: !!searchValue }));
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as SortType;
        updateFilter('sortType', value);
        setActiveFilters(prev => ({ ...prev, sort: true }));
    };

    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setPriceRange({ value });
        
        // Обновляем градиент ползунка
        const percent = ((value - 1) / (20 - 1)) * 100;
        e.target.style.setProperty('--value-percent', `${percent}%`);
        const timeoutId = setTimeout(() => {
            // Преобразуем значение в реальную цену (умножаем на 1000)
            const realPrice = value * 1000;
            updateFilter('maxPrice', realPrice);
            setActiveFilters(prev => ({ ...prev, price: true }));
        }, 300);

        return () => clearTimeout(timeoutId);
    };

    // Эффект для установки начального градиента
    useEffect(() => {
        const slider = document.querySelector(`.${styles.rangeSlider}`) as HTMLInputElement;
        if (slider) {
            const percent = ((priceRange.value - 1) / (20 - 1)) * 100;
            slider.style.setProperty('--value-percent', `${percent}%`);
        }
    }, []);

    const handleBackToCategories = () => {
        resetFilters();
        navigate('/catalog');
        setShowCategorySelector(true);
    };

    const handleResetFilters = () => {
        setSearchValue('');
        setPriceRange({ value: 20 });
        setActiveFilters({ search: false, price: false, category: false, sort: false });
        resetFilters();
        if (selectedCategory) {
            updateFilter('category', selectedCategory);
            updateFilter('maxPrice', 20000);
        }
        applyFilters();
    };

    const handleProductClick = (product: Product) => {
        // Навигация на страницу товара
        navigate(`/product/${product.id}`);
    };

    const handleImageClick = (e: React.MouseEvent, imageUrl: string) => {
        e.stopPropagation();
        setSelectedImage(imageUrl);
        setIsImageModalOpen(true);
    };

    const handleAction = (e: React.MouseEvent, product: Product, type: 'cart' | 'compare') => {
        e.stopPropagation();
        const cardElement = cardRefs.current[product.id];
        
        if (cardElement) {
            const rect = cardElement.getBoundingClientRect();
            const targetRect = type === 'cart' 
                ? document.querySelector('[data-cart-icon]')?.getBoundingClientRect()
                : document.querySelector('[data-compare-icon]')?.getBoundingClientRect();

            if (targetRect) {
                const config: AnimationConfig = {
                    startPosition: { x: rect.left, y: rect.top },
                    endPosition: { x: targetRect.left, y: targetRect.top },
                    type
                };

                setAnimationConfigs(prev => ({ ...prev, [product.id]: config }));
                setAnimatingProducts(prev => ({ ...prev, [product.id]: true }));

                if (type === 'cart') {
                    addToCart(product);
                } else {
                    addToCompare(product);
                }
            }
        }
    };

    const handleFavoriteClick = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        addToFavorite(product);
    };

    // Обновляем useEffect для обработки изменения категории
    useEffect(() => {
        if (selectedCategory) {
            updateFilter('category', selectedCategory);
            // Устанавливаем начальную цену
            setPriceRange({ value: 20 });
            updateFilter('maxPrice', 20000);
            // Добавляем плавную прокрутку к фильтрам
            setTimeout(() => {
                filterSectionRef.current?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }, [selectedCategory]);

    return (
        <div className={styles.filter}>
            {selectedCategory && (
                <PageTitle title={`Категория: ${selectedCategory}`} />
            )}
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

            <div className={styles.categoriesSection}>
                <CabelCatalog />
            </div>

            <div id="filter-section" className={styles.filter_title} ref={filterSectionRef}>
                <h2>{selectedCategory ? `Товары категории "${selectedCategory}"` : 'Все товары'}</h2>
                <div className={styles.sortAndSearch}>
                    <form className={styles.searchBox} onSubmit={handleSearchSubmit}>
                        <input 
                            type="text" 
                            placeholder="Поиск товаров..."
                            value={searchValue}
                            onChange={handleSearchChange}
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
                        </select>
                    </div>
                </div>
            </div>

            <div className={styles.filter_body}>
                <div className={`${styles.filter_sidebar} ${showMobileFilters ? styles.mobileSidebarOpen : ''}`}>
                    

                    <div className={styles.filter_section}>
                        <h3>Цена</h3>
                        <div className={styles.priceRange}>
                            <div className={styles.priceSliders}>
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    step="0.5"
                                    value={priceRange.value}
                                    onChange={handlePriceRangeChange}
                                    className={styles.rangeSlider}
                                />
                            </div>
                            <div className={styles.priceValues}>
                                <span>до {(priceRange.value).toLocaleString()} ₽</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.filter_section}>
                        <h3>Категории</h3>
                        {categories.map((cat) => (
                            <label key={cat.category} className={styles.categoryLabel}>
                                <input
                                    type="checkbox"
                                    checked={filterOptions.category === cat.label}
                                    onChange={() => {
                                        if (filterOptions.category === cat.label) {
                                            updateFilter('category', undefined);
                                        } else {
                                            updateFilter('category', cat.label);
                                        }
                                        setActiveFilters(prev => ({ ...prev, category: true }));
                                    }}
                                />
                                <span>{cat.label}</span>
                            </label>
                        ))}
                    </div>

                    {Object.values(activeFilters).some(Boolean) && (
                        <button 
                            className={styles.resetButton}
                            onClick={handleResetFilters}
                        >
                            Сбросить все фильтры
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
                            
                            {!selectedCategory && !showCategorySelector && (
                                <div className={styles.categorySelector} style={{ marginTop: '30px' }}>
                                    <CabelCatalog />
                                </div>
                            )}
                        </div>
                    ) : (
                        products.map((product) => {
                            const isFavorite = isInFavorites(product);
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
                                >
                                    {product.size && (
                                        <div className={styles.size_badge}>{product.size}</div>
                                    )}
                                    <div className={styles.card_image}>
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            onClick={(e) => handleImageClick(e, product.image || '')}
                                        />
                                    </div>
                                    <div className={styles.card_title}>
                                        <h2>{product.name}</h2>
                                        <span>Артикул: {product.article || 'Не указан'}</span>
                                    </div>
                                    <div className={styles.card_more}>
                                        <h2>{product.cost}</h2>
                                        <div className={styles.card_actions}>
                                            <button 
                                                className={styles.card_more_button}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAction(e, product, 'cart');
                                                }}
                                            >
                                                В корзину
                                            </button>
                                            <div className={styles.card_more_icons}>
                                                <img 
                                                    src={isFavorite ? heartFilled : heartEmpty}
                                                    alt="В избранное"
                                                    onClick={(e) => handleFavoriteClick(e, product)}
                                                    title="Добавить в избранное"
                                                />
                                                <img 
                                                    src={compareIcon}
                                                    alt="Сравнить"
                                                    onClick={(e) => handleAction(e, product, 'compare')}
                                                    title="Добавить к сравнению"
                                                />
                                            </div>
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
            
            <ImageModal 
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                imageUrl={selectedImage}
                altText="Изображение товара"
            />
        </div>
    );
};

export default CabelFilter; 