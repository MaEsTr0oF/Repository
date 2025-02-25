import styles from './ProductPage.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useState } from 'react';
import DeliveryInfo from './DeliveryInfo';
import ImageModal from '../ImageModal/ImageModal';
import PageTitle from '../PageTitle/PageTitle';

interface Product {
    id: number;
    title: string;
    article: string;
    price: number;
    image: string;
    manufacturer?: string;
    text?: string;
}

// Типы вкладок
type TabType = 'description' | 'delivery';

const recommendedProducts: Product[] = [
    {
        id: 1,
        title: 'Силовой кабель',
        article: 'СК-1234567890',
        price: 10.26,
        image: '/img/products/image1.png',
        manufacturer: 'Камкабель',
        text: 'Силовой кабель для промышленного использования. Высокая надежность и долговечность.'
    },
    {
        id: 2,
        title: 'Кабель управления',
        article: 'КУ-1234567890',
        price: 10.61,
        image: '/img/products/image2.png',
        manufacturer: 'Uncomtech',
        text: 'Кабель управления для систем автоматизации. Устойчив к помехам и электромагнитным воздействиям.'
    },
    {
        id: 3,
        title: 'Монтажный универсальный кабель',
        article: 'МУК-1234567890',
        price: 10.03,
        image: '/img/products/image3.png',
        manufacturer: 'Спецкабельстрой',
        text: 'Универсальный монтажный кабель для различных типов соединений. Простота монтажа и надежность.'
    },
    {
        id: 4,
        title: 'Контрольный кабель',
        article: 'КК-1234567890',
        price: 10.17,
        image: '/img/products/image4.png',
        manufacturer: 'Кабель Москва',
        text: 'Контрольный кабель для систем мониторинга и управления. Высокая точность передачи сигнала.'
    }
];

export default function ProductPage() {
    const location = useLocation();
    const { addToCart } = useShop();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<TabType>('description');
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    
    // Получаем данные о товаре из state навигации или используем заглушку
    const { title, price, productImage, description, deliveryInfo, article, brand } = location.state || {};
    
    // Добавляем PageTitle с динамическим заголовком товара
    const pageTitle = title ? `${title} - КабельОпт` : 'Товар - КабельОпт';

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        // Используем данные из location.state или заглушки
        const productId = location.state?.id || Math.random().toString(36).substr(2, 9);
        const productTitle = title || "Наименование товара";
        const productPrice = (price || 2990).toString();
        const productImg = productImage || "/img/products/product.png";
        const productCategory = location.state?.category || "Кабельная продукция";
        
        addToCart({
            id: productId,
            name: productTitle,
            cost: productPrice,
            image: productImg,
            quantity: quantity,
            category: productCategory
        });
    };

    const handleImageClick = () => {
        setIsImageModalOpen(true);
    };

    // Проверяем наличие данных для вкладок
    const hasDescription = !!description;
    // Всегда показываем вкладку доставки, так как у нас есть стандартная информация
    const hasDeliveryInfo = true;

    // Если нет данных для активной вкладки, но есть для другой, переключаемся
    if (!hasDescription && activeTab === 'description') {
        setActiveTab('delivery');
    }

    return (
        <div className={styles.productPage}>
            <PageTitle title={pageTitle} />
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
                        <img 
                            src={productImage || "/img/products/product.png"} 
                            alt={title || "Наименование товара"} 
                            onClick={handleImageClick}
                            style={{ cursor: 'zoom-in' }}
                        />
                    </div>

                    <div className={styles.productInfo}>
                        <div className={styles.brand}>{brand || 'Бренд'}</div>
                        <h1>{title || "Наименование товара"}</h1>
                        <div className={styles.article}>Артикул: {article || 'Н/Д'}</div>
                        <div className={styles.price}>{price ? `${price} ₽` : "2990 ₽"}</div>

                        {/* Отображаем вкладки только если есть данные хотя бы для одной из них */}
                        {(hasDescription || hasDeliveryInfo) && (
                            <div className={styles.tabs}>
                                {hasDescription && (
                                    <button 
                                        className={`${styles.tab} ${activeTab === 'description' ? styles.active : ''}`}
                                        onClick={() => setActiveTab('description')}
                                    >
                                        Описание
                                    </button>
                                )}
                                {hasDeliveryInfo && (
                                    <button 
                                        className={`${styles.tab} ${activeTab === 'delivery' ? styles.active : ''}`}
                                        onClick={() => setActiveTab('delivery')}
                                    >
                                        Доставка и оплата
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Содержимое вкладок */}
                        {activeTab === 'description' && hasDescription && (
                            <div className={styles.description}>
                                <p>{description}</p>
                            </div>
                        )}
                        
                        {activeTab === 'delivery' && (
                            <DeliveryInfo customInfo={deliveryInfo} />
                        )}

                        {/* Если нет данных ни для одной вкладки, показываем сообщение */}
                        {!hasDescription && !hasDeliveryInfo && (
                            <div className={styles.description}>
                                <p>Информация о товаре отсутствует</p>
                            </div>
                        )}

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
                                                description: product.text || `Подробное описание товара ${product.title}. Характеристики и технические данные будут доступны в ближайшее время.`,
                                                price: product.price,
                                                article: product.article || 'Н/Д',
                                                brand: product.manufacturer || 'КабельОпт',
                                                deliveryInfo: "Доставка осуществляется по всей России. Оплата при получении или онлайн на сайте."
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

            {/* Модальное окно для отображения изображения на весь экран */}
            <ImageModal 
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                imageUrl={productImage || "/img/products/product.png"}
                altText={title || "Наименование товара"}
            />
        </div>
    );
} 