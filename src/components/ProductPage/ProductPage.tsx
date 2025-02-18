import styles from './ProductPage.module.css';
import { Link } from 'react-router-dom';
import image from '/img/header/heart.png';
import image1 from '/img/header/stats.png';

interface StarRatingProps {
    rating: number;
}

interface Product {
    id: number;
    title: string;
    article: string;
    rating: number;
    price: number;
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

const recommendedProducts: Product[] = [
    {
        id: 1,
        title: 'Силовой кабель',
        article: '1234567890',
        rating: 4.5,
        price: 10.26,
        image: '/img/products/image1.png'
    },
    {
        id: 2,
        title: 'Кабель управления',
        article: '1234567890',
        rating: 4.5,
        price: 10.61,
        image: '/img/products/image2.png'
    },
    {
        id: 3,
        title: 'Монтажный универсальный кабель',
        article: '1234567890',
        rating: 4.5,
        price: 10.03,
        image: '/img/products/image3.png'
    },
    {
        id: 4,
        title: 'Контрольный кабель',
        article: '1234567890',
        rating: 4.5,
        price: 10.17,
        image: '/img/products/image4.png'
    }
];

export default function ProductPage() {
    return (
        <div className={styles.productPage}>
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <Link to="/">Главная</Link>
                    <span>/</span>
                    <Link to="/catalog">Каталог</Link>
                    <span>/</span>
                    <Link to="/category">Категория</Link>
                    <span>/</span>
                    <Link to="/subcategory">Подкатегория</Link>
                    <span>/</span>
                    <span>Товар</span>
                </div>

                <div className={styles.productContent}>
                    <div className={styles.productImage}>
                        <img src="/img/products/product.png" alt="Наименование товара" />
                    </div>

                    <div className={styles.productInfo}>
                        <div className={styles.brand}>Бренд</div>
                        <h1>Наименование товара</h1>
                        <div className={styles.article}>Артикул</div>
                        <StarRating rating={4.5} />
                        <div className={styles.price}>2990 ₽</div>

                        <div className={styles.tabs}>
                            <button className={`${styles.tab} ${styles.active}`}>Описание</button>
                            <button className={styles.tab}>Доставка и оплата</button>
                        </div>

                        <div className={styles.description}>
                            <p>Автоматический выключатель ВА63 серии Домовой Schneider Electric, 3-полюсный, на номинальный ток 25 А, характеристика С, номинальная отключающая способность 4500 А.</p>
                            <p>- Автоматический выключатель Домовой обеспечивает защиту цепей от токов перегрузки и короткого замыкания.</p>
                            <p>- Предназначен для защиты от перегрузок и коротких замыканий. Обеспечивает надежную, стабильную и безопасную работу изделия.</p>
                            <p>- В результате чего органы зрения должны стоять, что обеспечивает дополнительную защиту.</p>
                            <p>- Для защиты внешних линий электропередачи защищает от выхода из строя рассчитанных линий при коротких замыканиях.</p>
                        </div>

                        <div className={styles.actions}>
                            <div className={styles.quantity}>
                                <button className={styles.minus}>-</button>
                                <input type="text" value="1" readOnly />
                                <button className={styles.plus}>+</button>
                            </div>
                            <button className={styles.addToCart}>В корзину</button>
                        </div>
                    </div>
                </div>

                <div className={styles.recommendedSection}>
                    <h2>С этим товаром покупают</h2>
                    <div className={styles.recommendedProducts}>
                        {recommendedProducts.map(product => (
                            <div key={product.id} className={styles.recommendedCard}>
                                <div className={styles.cardImage}>
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className={styles.cardInfo}>
                                    <h3>{product.title}</h3>
                                    <div className={styles.cardPrice}>
                                        <span>Цена: {product.price} руб.</span>
                                        <button className={styles.detailsButton}>Подробнее</button>
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