import styles from './Subcategory.module.css';
import { Link, useNavigate } from 'react-router-dom';
import image from '/img/header/heart.png';
import image1 from '/img/header/stats.png';

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
        title: 'Силовой кабель',
        article: '1234567890',
        rating: 4.5,
        price: 10.26,
        size: '160 × 38',
        image: '/img/products/image1.png'
    },
    {
        id: 2,
        title: 'Кабель управления',
        article: '1234567890',
        rating: 4.5,
        price: 10.61,
        size: '160 × 38',
        image: '/img/products/image2.png'
    },
    {
        id: 3,
        title: 'Монтажный универсальный кабель',
        article: '1234567890',
        rating: 4.5,
        price: 10.03,
        size: '160 × 38',
        image: '/img/products/image3.png'
    }
];

export default function Subcategory() {
    const navigate = useNavigate();

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className={styles.subcategory}>
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <Link to="/">Главная</Link>
                    <span>/</span>
                    <Link to="/catalog">Каталог</Link>
                    <span>/</span>
                    <span>Подкатегория</span>
                </div>

                <h1 className={styles.title}>Подкатегория</h1>

                <div className={styles.filterTitle}>
                    <h2>Сортировать</h2>
                    <div className={styles.filterButtons}>
                        <button className={styles.filterButton}>по цене</button>
                        <button className={styles.filterButton}>по популярности</button>
                        <button className={styles.filterButton}>по рейтингу</button>
                    </div>
                </div>

                <div className={styles.filterBody}>
                    <div className={styles.filterLegend}>
                        <h2>Цена, ₽</h2>
                        <div className={styles.legendInputs}>
                            <input type="text" placeholder="От 110" />
                            <span></span>
                            <input type="text" placeholder="До 999000" />
                        </div>
                        <div className={styles.legendSegment}>
                            <span className={styles.segmentLine}></span>
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

                    <div className={styles.filterCards}>
                        {products.map((product) => (
                            <div key={product.id} className={styles.card}>
                                {product.size && (
                                    <div className={styles.sizeBadge}>{product.size}</div>
                                )}
                                <div className={styles.cardImage}>
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className={styles.cardTitle}>
                                    <h2>{product.title}</h2>
                                    <span>Артикул: {product.article}</span>
                                    <StarRating rating={product.rating} />
                                </div>
                                <div className={styles.cardMore}>
                                    <h2>{product.price} ₽</h2>
                                    <div className={styles.cardMoreCount}>
                                        <span>-</span>
                                        <span>1</span>
                                        <span>+</span>
                                    </div>
                                    <button 
                                        className={styles.cardMoreButton}
                                        onClick={() => handleProductClick(product.id)}
                                    >
                                        Подробнее
                                    </button>
                                    <div className={styles.cardMoreFavorite}>
                                        <img src={image} alt="В избранное" />
                                        <img src={image1} alt="Сравнить" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 