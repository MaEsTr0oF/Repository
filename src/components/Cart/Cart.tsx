import styles from './Cart.module.css';
import { Link } from 'react-router-dom';

export default function Cart() {
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

                <div className={styles.cartContent}>
                    <div className={styles.cartItems}>
                        <div className={styles.cartItem}>
                            <input type="checkbox" className={styles.itemCheckbox} />
                            <div className={styles.itemImage}>
                                <img src="/img/products/image1.png" alt="Наименование товара" />
                            </div>
                            <div className={styles.itemInfo}>
                                <h3>Наименование товара</h3>
                                <p className={styles.itemArticle}>Артикул: 1234567890</p>
                                <div className={styles.itemSize}>2 кг</div>
                            </div>
                            <div className={styles.itemQuantity}>
                                <button className={styles.quantityBtn}>-</button>
                                <input type="text" value="1" readOnly />
                                <button className={styles.quantityBtn}>+</button>
                            </div>
                            <div className={styles.itemPrice}>
                                <span className={styles.price}>2990 ₽</span>
                                <button className={styles.itemDelete}>
                                    <span className={styles.cross}></span>
                                </button>
                                <button className={styles.itemFavorite}>
                                    <span className={styles.heart}></span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.cartSummary}>
                        <div className={styles.summaryBlock}>
                            <h2>Итого к оплате:</h2>
                            <div className={styles.summaryTotal}>
                                <span>2990 ₽</span>
                                <span className={styles.summaryWeight}>Вес: 2 кг</span>
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
                                    <span>Способ оплаты</span>
                                </label>
                                <label className={styles.paymentMethod}>
                                    <input type="radio" name="payment" />
                                    <span>Способ оплаты</span>
                                </label>
                                <label className={styles.paymentMethod}>
                                    <input type="radio" name="payment" />
                                    <span>Способ оплаты</span>
                                </label>
                                <label className={styles.paymentMethod}>
                                    <input type="radio" name="payment" />
                                    <span>Способ оплаты</span>
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
                </div>
            </div>
        </div>
    );
} 