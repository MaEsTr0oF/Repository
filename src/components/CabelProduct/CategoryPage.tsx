import styles from './CabelProduct.module.css'
import CabelFilter from "./CabelFilter/CabelFilter";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';

export default function CategoryPage() {
    const { category } = useParams<{ category?: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { updateFilter, resetFilters, applyFilters } = useShop();
    const isMounted = useRef(false);
    const previousCategory = useRef<string | undefined>(category);
    const isResettingRef = useRef(false);
    
    // Используем useLayoutEffect для начальной настройки
    useLayoutEffect(() => {
        // Устанавливаем флаг монтирования
        isMounted.current = true;
        previousCategory.current = category;
        
        return () => {
            isMounted.current = false;
        };
    }, [category]);
    
    // При изменении URL или параметра category применяем фильтр
    useEffect(() => {
        // Если нет категории или компонент не смонтирован, выходим
        if (!category || !isMounted.current) {
            if (!category) {
                navigate('/catalog', { replace: true });
            }
            return;
        }
        
        // Проверяем, изменилась ли категория
        if (previousCategory.current !== category) {
            previousCategory.current = category;
        }
        
        // Блокируем повторный вызов сброса, если он уже выполняется
        if (!isResettingRef.current) {
            isResettingRef.current = true;
            
            try {
                const decodedCategory = decodeURIComponent(category);
                
                // Сбрасываем фильтры
                resetFilters();
                
                // Устанавливаем фильтр категории
                updateFilter('category', decodedCategory);
                
                // Применяем фильтры
                applyFilters();
                
                // Устанавливаем title страницы
                document.title = `Категория: ${decodedCategory} | КабельОпт`;
            } catch (e) {
                console.error("Ошибка при декодировании категории:", e);
                navigate('/catalog', { replace: true });
            } finally {
                // Восстанавливаем возможность сброса с небольшой задержкой
                setTimeout(() => {
                    isResettingRef.current = false;
                }, 50);
            }
        }
        
        // Очистка при размонтировании (но не при каждом обновлении URL!)
        return () => {
            // Мы не сбрасываем фильтры здесь, так как это может создать цикл
            // resetFilters вызовется при монтировании нового компонента
        };
    }, [category, location.pathname, resetFilters, updateFilter, applyFilters, navigate]);
    
    // Если URL не содержит категорию, перенаправляем
    if (!category) {
        return null;
    }
    
    return (
        <div className={styles.cabelProduct}>
            <CabelFilter />
        </div>
    );
} 