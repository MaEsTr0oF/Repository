import styles from './CabelFilter.module.css'
import image from '/img/header/heart.png'
import image1 from '/img/header/stats.png'
import image2 from '/img/header/heart1.png'
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../../context/ShopContext';
import AddToCartAnimation from '../../AddToCartAnimation/AddToCartAnimation';

interface StarRatingProps {
    rating: number;
}

interface Manufacturer {
    id: number;
    name: string;
}

interface Color {
    id: string;
    name: string;
}

interface Product {
    id: number;
    title: string;
    article: string;
    rating: number;
    price: number;
    size: string;
    image: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
        <div className={styles.starRating}>
            {[...Array(5)].map((_, index) => {
                if (index < fullStars) {
                    return <span key={index} className={styles.star}>★</span>;
                } else if (index === fullStars && hasHalfStar) {
                    return <span key={index} className={`${styles.star} ${styles.halfStar}`}>★</span>;
                }
                return <span key={index} className={`${styles.star} ${styles.emptyStar}`}>★</span>;
            })}
            <span className={styles.ratingNumber}>({rating})</span>
        </div>
    );
};

const manufacturers: Manufacturer[] = [
    { id: 1, name: 'Производитель 1' },
    { id: 2, name: 'Производитель 2' },
    { id: 3, name: 'Производитель 3' }
];

const colors: Color[] = [
    { id: 'white', name: 'Белый' },
    { id: 'black', name: 'Чёрный' },
    { id: 'blue', name: 'Синий' },
    { id: 'red', name: 'Красный' }
];

const products: Product[] = [
    {
        id: 1,
        title: 'Наименование товара',
        article: '1234567890',
        rating: 4.5,
        price: 2990,
        size: '160 × 38',
        image: '/img/products/image1.png'
    },
    {
        id: 2,
        title: 'Наименование товара',
        article: '1234567890',
        rating: 4.5,
        price: 2990,
        size: '160 × 38',
        image: '/img/products/image2.png'
    },
    {
        id: 3,
        title: 'Наименование товара',
        article: '1234567890',
        rating: 4.5,
        price: 2990,
        size: '160 × 38',
        image: '/img/products/image3.png'
    },
    {
        id: 4,
        title: 'Наименование товара',
        article: '1234567890',
        rating: 4.5,
        price: 2990,
        size: '160 × 38',
        image: '/img/products/image4.png'
    },
];

const CabelFilter: React.FC = () => {
    const navigate = useNavigate();
    const { addToCart, addToCompare, addToFavorite, isInFavorites } = useShop();
    const [animatingProducts, setAnimatingProducts] = useState<{[key: number]: boolean}>({});
    const [favoriteProducts, setFavoriteProducts] = useState<{[key: number]: boolean}>({});
    const [animationConfigs, setAnimationConfigs] = useState<{[key: number]: {
        startPosition: { x: number; y: number };
        endPosition: { x: number; y: number };
        type: 'cart' | 'compare';
    }}>({});
    const cardRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

    const handleProductClick = (product: Product) => {
        navigate(`/product/${product.id}`, {
            state: {
                productImage: product.image,
                title: product.title,
                description: product.article,
                price: product.price
            }
        });
    };

    const getTargetPosition = (type: 'cart' | 'compare') => {
        const targetElement = document.querySelector(
            type === 'cart' 
                ? '[data-cart-icon]' 
                : '[data-compare-icon]'
        );
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        }
        return { x: 0, y: 0 };
    };

    const handleAction = (e: React.MouseEvent, product: Product, type: 'cart' | 'compare') => {
        e.stopPropagation();
        const cardRef = cardRefs.current[product.id];
        if (!cardRef) return;

        const rect = cardRef.getBoundingClientRect();
        const startPosition = {
            x: rect.left,
            y: rect.top
        };
        const endPosition = getTargetPosition(type);

        setAnimationConfigs(prev => ({
            ...prev,
            [product.id]: {
                startPosition,
                endPosition,
                type
            }
        }));
        setAnimatingProducts(prev => ({ ...prev, [product.id]: true }));

        if (type === 'cart') {
            const productToAdd = {
                imagesrc: product.image,
                label: product.title,
                text: product.article,
                cost: product.price.toString(),
                id: Date.now().toString()
            };
            addToCart(productToAdd);
        } else {
            const productToCompare = {
                imagesrc: product.image,
                label: product.title,
                text: product.article,
                cost: product.price.toString(),
                id: Date.now().toString()
            };
            addToCompare(productToCompare);
        }
    };

    const handleFavoriteClick = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        const productToAdd = {
            imagesrc: product.image,
            label: product.title,
            text: product.article,
            cost: product.price.toString()
        };
        addToFavorite(productToAdd);
        setFavoriteProducts(prev => ({
            ...prev,
            [product.id]: !prev[product.id]
        }));
    };

    return (
        <div className={styles.filter}>
            <div className={styles.breadcrumbs}>
                <a href="/">Главная</a>
                <span>/</span>
                <a href="/catalog">Каталог</a>
                <span>/</span>
                <span>Кабельная продукция</span>
            </div>

            <div className={styles.filter_title}>
                <h2>Сортировать</h2>
                <div className={styles.filter_buttons}>
                    <button className={styles.filter_button}>По цене</button>
                    <button className={styles.filter_button}>По популярности</button>
                    <button className={styles.filter_button}>По рейтингу</button>
                </div>
            </div>

            <div className={styles.filter_body}>
                <div className={styles.filter_legend}>
                    <h2>Цена, ₽</h2>
                    <div className={styles.legend_inputs}>
                        <input type="text" placeholder="От 110" />
                        <span></span>
                        <input type="text" placeholder="До 999000" />
                    </div>
                    <div className={styles.legend_segment}>
                        <span className={styles.segment_line}></span>
                    </div>
                    
                    <div className={styles.checkboxGroup}>
                        <h3>Производитель</h3>
                        {manufacturers.map(manufacturer => (
                            <label key={manufacturer.id} className={styles.checkboxLabel}>
                                <input type="checkbox" className={styles.checkbox} />
                                <span className={styles.checkmark}></span>
                                {manufacturer.name}
                            </label>
                        ))}
                    </div>

                    <div className={styles.checkboxGroup}>
                        <h3>Цвет</h3>
                        {colors.map(color => (
                            <label key={color.id} className={styles.checkboxLabel}>
                                <input type="checkbox" className={styles.checkbox} />
                                <span className={styles.checkmark}></span>
                                {color.name}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={styles.filter_cards}>
                    {products.map((product) => {
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
                            >
                                {product.size && (
                                    <div className={styles.size_badge}>{product.size}</div>
                                )}
                                <div className={styles.card_image}>
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className={styles.card_title}>
                                    <h2>{product.title}</h2>
                                    <span>Артикул: {product.article}</span>
                                    <StarRating rating={product.rating} />
                                </div>
                                <div className={styles.card_more}>
                                    <h2>{product.price} ₽</h2>
                                    <button 
                                        className={styles.card_more_button}
                                        onClick={() => handleProductClick(product)}
                                    >
                                        Подробнее
                                    </button>
                                    <button 
                                        className={styles.card_more_button}
                                        onClick={(e) => handleAction(e, product, 'cart')}
                                    >
                                        В корзину
                                    </button>
                                    <div className={styles.card_more_favorive}>
                                        <img 
                                            src={isFavorite ? image2 : image} 
                                            alt="В избранное"
                                            onClick={(e) => handleFavoriteClick(e, product)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <img 
                                            src={image1} 
                                            alt="Сравнить"
                                            onClick={(e) => handleAction(e, product, 'compare')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>

                                {animatingProducts[product.id] && animationConfigs[product.id] && (
                                    <AddToCartAnimation
                                        startPosition={animationConfigs[product.id].startPosition}
                                        endPosition={animationConfigs[product.id].endPosition}
                                        imageUrl={product.image}
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
                    })}
                </div>
            </div>
        </div>
    );
};

export default CabelFilter; 