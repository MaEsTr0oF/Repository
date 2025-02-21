import styles from './Favorites.module.css';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useState } from 'react';

export default function Favorites() {
    const { favoriteItems, removeFromFavorite, addToCart } = useShop();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelectAll = () => {
        if (selectedItems.length === favoriteItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(favoriteItems.map(item => item.id || ''));
        }
    };

    const handleSelectItem = (itemId: string) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(prev => prev.filter(id => id !== itemId));
        } else {
            setSelectedItems(prev => [...prev, itemId]);
        }
    };

    const handleDeleteSelected = () => {
        selectedItems.forEach(id => removeFromFavorite(id));
        setSelectedItems([]);
    };

    const handleAddToCart = (item: typeof favoriteItems[0]) => {
        addToCart(item);
    };

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
                        <button 
                            className={styles.selectAll}
                            onClick={handleSelectAll}
                        >
                            <span className={styles.checkbox}></span>
                            Выделить всё
                        </button>
                        <button 
                            className={styles.deleteSelected}
                            onClick={handleDeleteSelected}
                            disabled={selectedItems.length === 0}
                        >
                            <span className={styles.cross}></span>
                            Удалить выбранные
                        </button>
                    </div>
                </div>

                <div className={styles.favoritesContent}>
                    <div className={styles.favoriteItems}>
                        {favoriteItems.length === 0 ? (
                            <div className={styles.emptyFavorites}>
                                <h2>Список отложенных товаров пуст</h2>
                                <p>Добавьте товары, которые хотите купить позже</p>
                                <Link to="/catalog" className={styles.continueShopping}>
                                    Перейти в каталог
                                </Link>
                            </div>
                        ) : (
                            favoriteItems.map(item => (
                                <div key={item.id} className={styles.favoriteItem}>
                                    <input 
                                        type="checkbox" 
                                        className={styles.itemCheckbox}
                                        checked={selectedItems.includes(item.id || '')}
                                        onChange={() => handleSelectItem(item.id || '')}
                                    />
                                    <div className={styles.itemImage}>
                                        <img src={item.imagesrc} alt={item.label} />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h3>{item.label}</h3>
                                        <p className={styles.itemArticle}>{item.text}</p>
                                    </div>
                                    <div className={styles.itemPrice}>
                                        <span className={styles.price}>{item.cost} ₽</span>
                                        <div className={styles.itemActions}>
                                            <button 
                                                className={styles.addToCart}
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                В корзину
                                            </button>
                                            <button 
                                                className={styles.itemDelete}
                                                onClick={() => removeFromFavorite(item.id || '')}
                                            >
                                                <span className={styles.cross}></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {favoriteItems.length > 0 && (
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
                                    <p className={styles.emptyMessage}>
                                        Рекомендации появятся на основе ваших отложенных товаров
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 