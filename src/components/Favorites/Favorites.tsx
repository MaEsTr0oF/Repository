import styles from './Favorites.module.css';
import { Link } from 'react-router-dom';

export default function Favorites() {
    return (
        <div className={styles.favorites}>
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <Link to="/">Главная</Link>
                    <span>/</span>
                    <span>Отложенные</span>
                </div>

                <div className={styles.favoritesHeader}>
                    <h1>Отложенные товары</h1>
                    <div className={styles.favoritesActions}>
                        <button className={styles.selectAll}>
                            <span className={styles.checkbox}></span>
                            Выделить всё
                        </button>
                        <button className={styles.deleteSelected}>
                            <span className={styles.cross}></span>
                            Удалить выбранные
                        </button>
                    </div>
                </div>

                <div className={styles.favoritesContent}>
                    <div className={styles.favoriteItems}>
                        <div className={styles.favoriteItem}>
                            <input type="checkbox" className={styles.itemCheckbox} />
                            <div className={styles.itemImage}>
                                <img src="/img/products/image1.png" alt="Наименование товара" />
                            </div>
                            <div className={styles.itemInfo}>
                                <h3>Наименование товара</h3>
                                <p className={styles.itemArticle}>Артикул: 1234567890</p>
                                <div className={styles.itemSize}>2 кг</div>
                            </div>
                            <div className={styles.itemPrice}>
                                <span className={styles.price}>2990 ₽</span>
                                <div className={styles.itemActions}>
                                    <button className={styles.addToCart}>В корзину</button>
                                    <button className={styles.itemDelete}>
                                        <span className={styles.cross}></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.favoritesInfo}>
                        <div className={styles.infoBlock}>
                            <h2>Информация</h2>
                            <p>В отложенных товарах вы можете сохранить интересующие вас позиции, чтобы вернуться к ним позже.</p>
                            <ul>
                                <li>Товары сохраняются на 30 дней</li>
                                <li>Вы можете добавить их в корзину в любой момент</li>
                                <li>При изменении цены мы вас уведомим</li>
                                <li>Вы можете сравнить товары между собой</li>
                            </ul>
                        </div>

                        <div className={styles.recommendedBlock}>
                            <h3>Рекомендуемые товары</h3>
                            <div className={styles.recommendedItems}>
                                {/* Здесь будут рекомендуемые товары */}
                                <p className={styles.emptyMessage}>Рекомендации появятся на основе ваших отложенных товаров</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 