import { useLocation, useParams } from 'react-router-dom';
import styles from './CabelProduct.module.css'
import CabelCatalog from "./CabelCatalog/CabelCatalog";
import CabelFilter from "./CabelFilter/CabelFilter";
import PageTitle from "../PageTitle/PageTitle";
import { useEffect, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';

export default function CabelProduct() {
	const location = useLocation();
	const { category } = useParams<{ category?: string }>();
	const { updateFilter, resetFilters, applyFilters } = useShop();
	
	// Получаем категорию либо из параметров URL, либо из состояния навигации
	const selectedCategory = useMemo(() => {
		return category || location.state?.selectedCategory || '';
	}, [category, location.state?.selectedCategory]);
	
	// Применяем фильтр по категории при монтировании компонента
	useEffect(() => {
		resetFilters();
		if (selectedCategory) {
			updateFilter('category', selectedCategory);
		}
		applyFilters();
	}, [selectedCategory, updateFilter, resetFilters, applyFilters]);
	
	// Мемоизируем компоненты для предотвращения лишних обновлений
	const pageTitleComponent = useMemo(() => {
		return !selectedCategory && <PageTitle title="Каталог товаров" />;
	}, [selectedCategory]);
	
	const cabelCatalogComponent = useMemo(() => {
		return !selectedCategory && <CabelCatalog />;
	}, [selectedCategory]);
	
	return(
		<div className={styles.cabelProduct}>
			{pageTitleComponent}
			
			{/* Показываем каталог категорий только если не выбрана конкретная категория */}
			{cabelCatalogComponent}
			
			{/* Фильтр товаров показываем всегда */}
			<CabelFilter />
		</div>
	)
}