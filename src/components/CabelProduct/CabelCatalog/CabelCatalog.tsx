import styles from "./CabelCatalog.module.css"
import image2 from "/img/CabelCatalog/image-11.jpg"
import image1 from "/img/CabelCatalog/image13.png"
import image from "/img/CabelCatalog/image1.png"
import image4 from "/img/CabelCatalog/image.jpg"
import image5 from "/img/CabelCatalog/image2.png"
import image6 from "/img/CabelCatalog/image3.png"
import PageTitle from "../../PageTitle/PageTitle"
import { useNavigate } from "react-router-dom"
import React, { useMemo, useCallback } from "react"

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
		console.log('CabelCatalog: Клик по категории:', category);
		
		// Переходим на страницу категории
		// Фильтры будут сброшены и применены компонентом CategoryPage
		const encodedCategory = encodeURIComponent(category);
		console.log('CabelCatalog: Переходим на URL:', `/catalog/${encodedCategory}`);
		
		// Используем navigate без replace для правильной работы истории браузера
		navigate(`/catalog/${encodedCategory}`);
	}, [navigate]);
	
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