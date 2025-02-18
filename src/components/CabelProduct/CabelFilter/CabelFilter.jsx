import styles from './CabelFilter.module.css'
import image from '/img/header/heart.png'
import image1 from '/img/header/stats.png'

const products = [
	{
		id: 1,
		title: 'Наименование товара',
		article: '1234567890',
		rating: 4.5,
		price: 2990,
		size: '160 × 38',
		image: '/img/products/cable1.png'
	},
	// Добавьте больше товаров по необходимости
];

export default function CabelFilter() {
	return (
		<div className={styles.filter}>
			<div className={styles.breadcrumbs}>
				<a href="/">Главная</a>
				<span>/</span>
				<a href="/catalog">Каталог</a>
				<span>/</span>
				<span>Кабельная продукция</span>
			</div>

			<div className={styles.filter_title}>
				<h2>Сортировать</h2>
				<div className={styles.filter_buttons}>
					<button className={styles.filter_button}>По цене</button>
					<button className={styles.filter_button}>По популярности</button>
					<button className={styles.filter_button}>По рейтингу</button>
				</div>
			</div>

			<div className={styles.filter_body}>
				<div className={styles.filter_legend}>
					<h2>Цена, ₽</h2>
					<div className={styles.legend_inputs}>
						<input type="text" placeholder="От 110" />
						<span></span>
						<input type="text" placeholder="До 999000" />
					</div>
					<div className={styles.legend_segment}>
						<span className={styles.segment_line}></span>
					</div>
					<select className={styles.legend_efficiency}>
						<option value="">Производитель</option>
						<option value="1">Производитель 1</option>
						<option value="2">Производитель 2</option>
						<option value="3">Производитель 3</option>
					</select>
					<select className={styles.legend_color}>
						<option value="">Цвет</option>
						<option value="white">Белый</option>
						<option value="black">Чёрный</option>
						<option value="blue">Синий</option>
						<option value="red">Красный</option>
					</select>
				</div>

				<div className={styles.filter_cards}>
					{products.map((product) => (
						<div key={product.id} className={styles.card}>
							{product.size && (
								<div className={styles.size_badge}>{product.size}</div>
							)}
							<div className={styles.card_image}>
								<img src={product.image} alt={product.title} />
							</div>
							<div className={styles.card_title}>
								<h2>{product.title}</h2>
								<span>Артикул: {product.article}</span>
								<div className={styles.card_star_rating}>
									<span>Рейтинг: {product.rating}</span>
								</div>
							</div>
							<div className={styles.card_more}>
								<h2>{product.price} ₽</h2>
								<div className={styles.card_more_count}>
									<span>-</span>
									<span>1</span>
									<span>+</span>
								</div>
								<button className={styles.card_more_button}>В корзину</button>
								<div className={styles.card_more_favorive}>
									<img src={image} alt="В избранное" />
									<img src={image1} alt="Сравнить" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
