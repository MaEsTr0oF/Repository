import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import heart from '/img/header/heart.png';
import { useShop } from '../../context/ShopContext';
import { useState } from 'react';

export default function Cart() {
    const { cartItems, removeFromCart } = useShop();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelectAll = () => {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map(item => item.id || ''));
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
        selectedItems.forEach(id => removeFromCart(id));
        setSelectedItems([]);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const cost = parseFloat(item.cost) || 0;
            return total + cost;
        }, 0);
    };

    return (
        <div className={styles.cart}>
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <Link to="/">Главная</Link>
                    <span>/</span>
                    <span>Корзина</span>
                </div>

                <div className={styles.cartHeader}>
                    <h1>Корзина</h1>
                    <div className={styles.cartActions}>
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

                <div className={styles.cartContent}>
                    <div className={styles.cartItems}>
                        {cartItems.length === 0 ? (
                            <div className={styles.emptyCart}>
                                <p>Ваша корзина пуста</p>
                                <Link to="/catalog" className={styles.continueShopping}>
                                    Перейти к покупкам
                                </Link>
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <div key={item.id} className={styles.cartItem}>
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
                                    <div className={styles.itemQuantity}>
                                        <button className={styles.quantityBtn}>-</button>
                                        <input type="text" value="1" readOnly />
                                        <button className={styles.quantityBtn}>+</button>
                                    </div>
                                    <div className={styles.itemPrice}>
                                        <span className={styles.price}>{item.cost} ₽</span>
                                        <span 
                                            className={styles.cross}
                                            onClick={() => removeFromCart(item.id || '')}
                                        ></span>
                                        <span className={styles.heart}>
                                            <img src={heart} alt="" />
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className={styles.cartSummary}>
                            <div className={styles.summaryBlock}>
                                <h2>Итого к оплате:</h2>
                                <div className={styles.summaryTotal}>
                                    <span>{calculateTotal().toFixed(2)} ₽</span>
                                </div>
                                <button className={styles.checkoutButton}>Оформить заказ</button>
                            </div>

                            <div className={styles.deliveryBlock}>
                                <h3>Способ доставки</h3>
                                <div className={styles.deliveryMap}>
                                    <div className={styles.mapPlaceholder}>
                                        Карта пунктов выдачи СДЭК
                                    </div>
                                </div>
                            </div>

                            <div className={styles.paymentBlock}>
                                <h3>Способ оплаты</h3>
                                <div className={styles.paymentMethods}>
                                    <label className={styles.paymentMethod}>
                                        <input type="radio" name="payment" />
                                        <span>Оплата картой</span>
                                    </label>
                                    <label className={styles.paymentMethod}>
                                        <input type="radio" name="payment" />
                                        <span>Оплата при получении</span>
                                    </label>
                                </div>
                            </div>

                            <div className={styles.contactBlock}>
                                <h3>Контактные данные</h3>
                                <form className={styles.contactForm}>
                                    <input type="text" placeholder="Имя" />
                                    <input type="tel" placeholder="Номер телефона" />
                                    <input type="text" placeholder="Почта" />
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 