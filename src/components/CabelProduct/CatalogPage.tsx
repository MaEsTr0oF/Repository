import styles from './CabelProduct.module.css';
import CabelFilter from "./CabelFilter/CabelFilter";
import PageTitle from "../PageTitle/PageTitle";
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import { useLocation } from 'react-router-dom';
import SEO from '../SEO/SEO';

export default function CatalogPage() {
    const { resetFilters } = useShop();
    const location = useLocation();
    const isMounted = useRef(false);
    const isResettingRef = useRef(false);
    
    // Используем useLayoutEffect для сброса фильтров при монтировании
    useLayoutEffect(() => {
        // Блокируем повторный вызов сброса
        if (!isResettingRef.current) {
            isResettingRef.current = true;
            
            // Сбрасываем фильтры при монтировании
            resetFilters();
            
            // Восстанавливаем возможность сброса с задержкой
            setTimeout(() => {
                isResettingRef.current = false;
            }, 50);
        }
        
        // Устанавливаем флаг монтирования
        isMounted.current = true;
        
        return () => {
            isMounted.current = false;
        };
    }, [resetFilters]);
    
    // Обрабатываем изменение URL отдельно от сброса фильтров
    useEffect(() => {
        // Только когда компонент уже смонтирован
        if (isMounted.current) {
            // Устанавливаем title страницы
            document.title = "Каталог товаров | КабельОпт";
        }
    }, [location.pathname]);
    
    return (
        <div className={styles.cabelProduct}>
            <SEO 
                title="Каталог товаров" 
                description="Полный каталог кабельной продукции, проводов и электротехнических товаров. Выбирайте из широкого ассортимента по лучшим ценам с доставкой."
                keywords="купить кабель, купить провод, каталог кабельной продукции, электротехника каталог, силовой кабель, оптический кабель"
            />
            <PageTitle title="Каталог товаров" />
            <CabelFilter />
        </div>
    );
} 