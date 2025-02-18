import styles from './Compare.module.css';
import { Link } from 'react-router-dom';

interface Product {
    id: number;
    title: string;
    article: string;
    rating: number;
    price: number;
    size: string;
    image: string;
    characteristics: {
        [key: string]: string;
    };
}

const products: Product[] = [
    {
        id: 1,
        title: 'Силовой кабель',
        article: '1234567890',
        rating: 4.5,
        price: 2990,
        size: '160 × 38',
        image: '/img/products/image1.png',
        characteristics: {
            'Сечение': '2.5 мм²',
            'Длина': '100 м',
            'Материал': 'Медь',
            'Изоляция': 'ПВХ',
            'Напряжение': '220В'
        }
    },
    {
        id: 2,
        title: 'Кабель управления',
        article: '1234567891',
        rating: 4.2,
        price: 3490,
        size: '180 × 42',
        image: '/img/products/image2.png',
        characteristics: {
            'Сечение': '1.5 мм²',
            'Длина': '50 м',
            'Материал': 'Медь',
            'Изоляция': 'Резина',
            'Напряжение': '380В'
        }
    }
];

export default function Compare() {
    return (
        <div className={styles.compare}>
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <Link to="/">Главная</Link>
                    <span>/</span>
                    <span>Сравнение товаров</span>
                </div>

                <div className={styles.compareHeader}>
                    <h1>Сравнение товаров</h1>
                    <div className={styles.compareActions}>
                        <button className={styles.clearAll}>
                            Очистить список
                        </button>
                        <div className={styles.displayToggle}>
                            <label>
                                <input type="checkbox" />
                                <span>Показать только различия</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles.compareContent}>
                    <div className={styles.compareTable}>
                        <div className={styles.compareColumn}>
                            <div className={styles.columnHeader}>
                                <h3>Характеристики</h3>
                            </div>
                            <div className={styles.characteristics}>
                                {Object.keys(products[0].characteristics).map(key => (
                                    <div key={key} className={styles.characteristicRow}>
                                        <span>{key}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {products.map(product => (
                            <div key={product.id} className={styles.compareColumn}>
                                <div className={styles.columnHeader}>
                                    <div className={styles.productImage}>
                                        <img src={product.image} alt={product.title} />
                                    </div>
                                    <h3>{product.title}</h3>
                                    <p className={styles.article}>Артикул: {product.article}</p>
                                    <p className={styles.price}>{product.price} ₽</p>
                                    <div className={styles.productActions}>
                                        <button className={styles.addToCart}>В корзину</button>
                                        <button className={styles.removeFromCompare}>Удалить</button>
                                    </div>
                                </div>
                                <div className={styles.characteristics}>
                                    {Object.entries(product.characteristics).map(([key, value]) => (
                                        <div key={key} className={styles.characteristicRow}>
                                            <span>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className={styles.compareColumn}>
                            <div className={styles.columnHeader}>
                                <div className={styles.addProduct}>
                                    <button className={styles.addButton}>
                                        <span>+</span>
                                        <span>Добавить товар</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 