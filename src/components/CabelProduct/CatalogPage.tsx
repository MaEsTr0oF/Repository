import styles from './CabelProduct.module.css';
import CabelCatalog from "./CabelCatalog/CabelCatalog";
import PageTitle from "../PageTitle/PageTitle";
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import { useLocation } from 'react-router-dom';

export default function CatalogPage() {
    const { resetFilters } = useShop();
    const location = useLocation();
    const isMounted = useRef(false);
    const isResettingRef = useRef(false);
    
    // Используем useLayoutEffect для сброса фильтров при монтировании
    useLayoutEffect(() => {
        console.log('CatalogPage: Компонент монтируется на маршруте', location.pathname);
        
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
            console.log('CatalogPage: Компонент размонтируется');
            isMounted.current = false;
        };
    }, [resetFilters]);
    
    // Обрабатываем изменение URL отдельно от сброса фильтров
    useEffect(() => {
        // Только когда компонент уже смонтирован
        if (isMounted.current) {
            console.log('CatalogPage: URL изменился на', location.pathname);
            
            // Устанавливаем title страницы
            document.title = "Каталог товаров | КабельОпт";
        }
    }, [location.pathname]);
    
    return (
        <div className={styles.cabelProduct}>
            <PageTitle title="Каталог товаров" />
            <CabelCatalog />
        </div>
    );
} 