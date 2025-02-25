import styles from "./CabelCatalog.module.css"
import image2 from "/img/CabelCatalog/image-11.jpg"
import image1 from "/img/CabelCatalog/image13.png"
import image from "/img/CabelCatalog/image1.png"
import image4 from "/img/CabelCatalog/image.jpg"
import image5 from "/img/CabelCatalog/image2.png"
import image6 from "/img/CabelCatalog/image3.png"
import PageTitle from "../../PageTitle/PageTitle"
import { useNavigate } from "react-router-dom"
import { useShop } from "../../../context/ShopContext"
import React, { useMemo, useCallback, useState } from "react"

interface CategoryData {
	image: string;
	label: string;
	category: string;
	description: string;
}

// Выносим Card в отдельный мемоизированный компонент с проверкой равенства пропсов
const Card = React.memo(function Card({
	image, 
	label, 
	category, 
	description, 
	onClick
}: CategoryData & { onClick: (category: string) => void }) {
	// Используем локальное состояние для обработки клика
	const handleClick = useCallback(() => {
		onClick(category);
	}, [category, onClick]);
	
	return(
		<div 
			className={styles.card} 
			onClick={handleClick}
			style={{ cursor: 'pointer' }}
			role="button"
			aria-label={`Категория ${label}`}
		>
			<img 
				className={styles.image} 
				src={image} 
				alt={label} 
				loading="lazy"
			/>
			<div className={styles.cardContent}>
				<h2>{label}</h2>
				<p className={styles.description}>{description}</p>
			</div>
		</div>
	)
}, (prevProps, nextProps) => {
	// Проверяем, изменились ли пропсы
	return (
		prevProps.category === nextProps.category &&
		prevProps.label === nextProps.label &&
		prevProps.image === nextProps.image &&
		prevProps.description === nextProps.description &&
		prevProps.onClick === nextProps.onClick
	);
});

export default function CabelCatalog(){
	const navigate = useNavigate();
	const { updateFilter, resetFilters } = useShop();
	
	// Предотвращаем повторные рендеры при навигации
	const [isNavigating, setIsNavigating] = useState(false);
	
	// Данные о категориях - используем useMemo для предотвращения ненужных перерендеров
	const categories = useMemo<CategoryData[]>(() => [
		{
			image: image1,
			label: "Кабель",
			category: "Кабель",
			description: "Широкий выбор кабельной продукции для различных нужд"
		},
		{
			image: image2,
			label: "Провод",
			category: "Провод",
			description: "Провода различного сечения и назначения"
		},
		{
			image: image,
			label: "Свет",
			category: "Свет",
			description: "Осветительные приборы и аксессуары для дома и офиса"
		},
		{
			image: image4,
			label: "Низковольтное оборудование",
			category: "Низковольтное оборудование",
			description: "Надежное низковольтное оборудование для электросетей"
		},
		{
			image: image5,
			label: "Системы безопасности",
			category: "Системы безопасности",
			description: "Современные системы безопасности и видеонаблюдения"
		},
		{
			image: image6,
			label: "Материалы для прокладки кабеля",
			category: "Материалы для прокладки кабеля",
			description: "Все необходимое для качественной прокладки кабеля"
		}
	], []);
	
	const handleCategoryClick = useCallback((category: string) => {
		if (isNavigating) return;
		setIsNavigating(true);

		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}

		resetFilters();
		updateFilter('category', category);
		navigate(`/catalog/${encodeURIComponent(category)}`);
		
		// Прокручиваем страницу к фильтрам с задержкой
		setTimeout(() => {
			const filterElement = document.querySelector(`.${styles.cabel}`);
			if (filterElement) {
				filterElement.scrollIntoView({ behavior: 'smooth' });
			}
			// Сбрасываем флаг навигации
			setIsNavigating(false);
		}, 300);
	}, [navigate, resetFilters, updateFilter, isNavigating]);
	
	// Мемоизируем рендеринг карточек
	const categoryCards = useMemo(() => {
		return categories.map((category, index) => (
			<Card 
				key={`category-${category.category}-${index}`}
				image={category.image}
				label={category.label}
				category={category.category}
				description={category.description}
				onClick={handleCategoryClick}
			/>
		));
	}, [categories, handleCategoryClick]);
	
	return(
		<div className={styles.cabel}>
			<PageTitle title="Кабельная продукция" />
			<h2 className={styles.sectionTitle}>
				Кабельная продукция 
			</h2>
			<div className={styles.products}>
				{categoryCards}
			</div>
		</div>
	)
}