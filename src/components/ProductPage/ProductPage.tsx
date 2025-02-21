import styles from './ProductPage.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useState } from 'react';

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
    const location = useLocation();
    const { productImage, title, description, price } = location.state || {};
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useShop();

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        addToCart({
            imagesrc: productImage || "/img/products/product.png",
            label: title || "Наименование товара",
            text: description || "Описание товара",
            cost: (price || 2990).toString(),
            quantity: quantity
        });
    };

    return (
        <div className={styles.productPage}>
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <Link to="/">Главная</Link>
                    <span>/</span>
                    <Link to="/catalog">Каталог</Link>
                    <span>/</span>
                    <span>{title || 'Товар'}</span>
                </div>

                <div className={styles.productContent}>
                    <div className={styles.productImage}>
                        <img src={productImage || "/img/products/product.png"} alt={title || "Наименование товара"} />
                    </div>

                    <div className={styles.productInfo}>
                        <div className={styles.brand}>Бренд</div>
                        <h1>{title || "Наименование товара"}</h1>
                        <div className={styles.article}>Артикул</div>
                        <StarRating rating={4.5} />
                        <div className={styles.price}>{price ? `${price} ₽` : "2990 ₽"}</div>

                        <div className={styles.tabs}>
                            <button className={`${styles.tab} ${styles.active}`}>Описание</button>
                            <button className={styles.tab}>Доставка и оплата</button>
                        </div>

                        <div className={styles.description}>
                            <p>{description || "Описание товара отсутствует"}</p>
                        </div>

                        <div className={styles.actions}>
                            <div className={styles.quantity}>
                                <button 
                                    className={styles.minus} 
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <input type="text" value={quantity} readOnly />
                                <button 
                                    className={styles.plus}
                                    onClick={() => handleQuantityChange(1)}
                                >
                                    +
                                </button>
                            </div>
                            <button 
                                className={styles.addToCart}
                                onClick={handleAddToCart}
                            >
                                В корзину
                            </button>
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
                                        <Link 
                                            to={`/product/${product.id}`}
                                            state={{
                                                productImage: product.image,
                                                title: product.title,
                                                description: product.article,
                                                price: product.price
                                            }}
                                            className={styles.detailsButton}
                                        >
                                            Подробнее
                                        </Link>
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