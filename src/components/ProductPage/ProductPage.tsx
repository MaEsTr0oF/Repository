import styles from './ProductPage.module.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useState, useEffect } from 'react';
import DeliveryInfo from './DeliveryInfo';
import ImageModal from '../ImageModal/ImageModal';
import PageTitle from '../PageTitle/PageTitle';
import SEO from '../SEO/SEO';
import { Helmet } from 'react-helmet-async';

// Типы для компонента
interface ProductData {
    title: string;
    description: string;
    price: string;
    article: string;
    brand: string;
    deliveryInfo: string;
    productImage?: string;
}

// Тип рекомендуемого продукта
interface Product {
    id: number;
    title: string;
    article: string;
    price: number;
    image: string;
    manufacturer: string;
    text: string;
}

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
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { demoProducts } = useShop();
    
    // Состояния
    const [activeTab, setActiveTab] = useState<TabType>('description');
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [productData, setProductData] = useState<ProductData | null>(null);
    
    // Получаем данные о товаре
    useEffect(() => {
        if (id) {
            // Находим продукт в списке всех продуктов
            const productInfo = demoProducts.find(product => product.id === id);
            
            if (productInfo) {
                // Если продукт найден, используем его данные
                setProductData({
                    title: productInfo.name,
                    description: productInfo.text || `Подробное описание товара ${productInfo.name}. Характеристики и технические данные.`,
                    price: productInfo.cost,
                    article: productInfo.article || 'Н/Д',
                    brand: 'КабельОпт',
                    deliveryInfo: "Доставка осуществляется по всей России. Оплата при получении или онлайн на сайте.",
                    productImage: productInfo.image
                });
            } else if (location.state) {
                // Если продукт не найден, но есть данные в location.state
                setProductData(location.state as ProductData);
            } else {
                // Если нет данных вообще, перенаправляем на каталог
                navigate('/catalog', { replace: true });
            }
        }
    }, [id, location.state, demoProducts, navigate]);
    
    // Обработчики переключения вкладок
    const handleDescriptionClick = () => {
        setActiveTab('description');
    };
    
    const handleDeliveryClick = () => {
        setActiveTab('delivery');
    };
    
    const handleImageClick = () => {
        setIsImageModalOpen(true);
    };
    
    if (!productData) {
        return <div className={styles.loading}>Загрузка товара...</div>;
    }
    
    // Определяем, нужно ли показывать вкладку с описанием
    const hasDescription = !!productData.description;
    const pageTitle = productData.title || 'Товар';
    
    return (
        <div className={styles.productPage}>
            <SEO 
                title={productData.title}
                description={`${productData.title} - ${productData.description.substring(0, 150)}...`}
                keywords={`${productData.title}, купить ${productData.title}, ${productData.article}, кабельная продукция`}
                ogImage={productData.productImage}
                ogType="product"
            />
            
            {/* Структурированные данные schema.org */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": productData.title,
                        "image": productData.productImage || "/img/products/product.png",
                        "description": productData.description,
                        "sku": productData.article,
                        "brand": {
                            "@type": "Brand",
                            "name": productData.brand
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": window.location.href,
                            "priceCurrency": "RUB",
                            "price": productData.price,
                            "availability": "https://schema.org/InStock",
                            "itemCondition": "https://schema.org/NewCondition"
                        }
                    })}
                </script>
            </Helmet>
            
            <PageTitle title={pageTitle} />
            <div className={styles.container}>
                <div className={styles.breadcrumbs}>
                    <Link to="/">Главная</Link>
                    <span>/</span>
                    <Link to="/catalog">Каталог</Link>
                    <span>/</span>
                    <span>{productData.title}</span>
                </div>

                <div className={styles.productContent}>
                    <div className={styles.productImage}>
                        <img 
                            src={productData.productImage || "/img/products/product.png"} 
                            alt={productData.title || "Наименование товара"} 
                            onClick={handleImageClick}
                            style={{ cursor: 'zoom-in' }}
                        />
                    </div>

                    <div className={styles.productInfo}>
                        <div className={styles.brand}>{productData.brand || 'Бренд'}</div>
                        <h1>{productData.title || "Наименование товара"}</h1>
                        <div className={styles.article}>Артикул: {productData.article || 'Н/Д'}</div>
                        <div className={styles.price}>{productData.price ? `${productData.price} ₽` : "2990 ₽"}</div>

                        {/* Отображаем вкладки только если есть данные хотя бы для одной из них */}
                        {(hasDescription || productData.deliveryInfo) && (
                            <div className={styles.tabs}>
                                {hasDescription && (
                                    <button 
                                        className={`${styles.tabButton} ${activeTab === 'description' ? styles.active : ''}`} 
                                        onClick={handleDescriptionClick}
                                    >
                                        Описание
                                    </button>
                                )}
                                <button 
                                    className={`${styles.tabButton} ${activeTab === 'delivery' ? styles.active : ''}`} 
                                    onClick={handleDeliveryClick}
                                >
                                    Доставка и оплата
                                </button>
                            </div>
                        )}

                        {/* Отображаем контент активной вкладки */}
                        {activeTab === 'description' && hasDescription && (
                            <div className={styles.description}>
                                <p>{productData.description}</p>
                            </div>
                        )}
                        
                        {activeTab === 'delivery' && (
                            <DeliveryInfo customInfo={productData.deliveryInfo} />
                        )}

                        <div className={styles.actions}>
                            <button className={styles.addToCartButton}>Добавить в корзину</button>
                            <button className={styles.addToFavoritesButton}>В избранное</button>
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
                imageUrl={productData.productImage || "/img/products/product.png"}
                altText={productData.title || "Наименование товара"}
            />
        </div>
    );
} 