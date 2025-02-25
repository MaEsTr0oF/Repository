import { useLocation, useParams, Navigate } from 'react-router-dom';
import styles from './CabelProduct.module.css'
import CabelCatalog from "./CabelCatalog/CabelCatalog";
import CabelFilter from "./CabelFilter/CabelFilter";
import PageTitle from "../PageTitle/PageTitle";
import { useEffect, useState } from 'react';
import { useShop } from '../../context/ShopContext';

export default function CabelProduct() {
	const location = useLocation();
	const { category } = useParams<{ category?: string }>();
	const { updateFilter, resetFilters, applyFilters } = useShop();
	const [key, setKey] = useState(0);

	// Эффект для обработки изменений маршрута
	useEffect(() => {
		// Принудительно обновляем компонент при изменении маршрута
		setKey(prev => prev + 1);

		// Если мы находимся на странице каталога без категории
		if (location.pathname === '/catalog') {
			resetFilters();
			return;
		}

		// Если у нас есть категория в URL
		if (category) {
			resetFilters();
			updateFilter('category', decodeURIComponent(category));
			applyFilters();
		}

		// Очистка при размонтировании
		return () => {
			resetFilters();
		};
	}, [location.pathname, category, resetFilters, updateFilter, applyFilters]);

	// Проверяем, что мы находимся на правильном маршруте
	if (!location.pathname.startsWith('/catalog')) {
		return <Navigate to="/catalog" replace />;
	}

	// Определяем, что показывать на основе текущего URL
	const showCatalog = location.pathname === '/catalog';

	return (
		<div className={styles.cabelProduct} key={`${key}-${location.pathname}`}>
			{showCatalog ? (
				<>
					<PageTitle title="Каталог товаров" />
					<CabelCatalog key={`catalog-${key}`} />
				</>
			) : (
				<CabelFilter key={`filter-${key}-${category}`} />
			)}
		</div>
	);
}