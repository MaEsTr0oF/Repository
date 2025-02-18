import styles from "./mainFind.module.css"

export default function MainFind(){
	return(
		<div className={styles.find}>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.selects}>
						<div className={styles.typeCable}>
							<span>Тип кабеля:</span>
							<select>Тип кабеля</select>
						</div>
						<div className={styles.typeCable}>
							<span>Длина кабеля:</span>
							<select>1 метр</select>
						</div>
						<div className={styles.typeCable}>
							<span>Стоимость:</span>
							<p>243 руб.</p>
						</div>
					</div>
					<div className={styles.right}>
						<h2>Лучшие цены напрямую от производителя. <br />Гарантия качества на всю продукцию!</h2>
						<div className={styles.buttons}>
							<button>Оформить заказ</button>
							<button>Связаться с менеджером</button>
							<button>Скачать прайс-лист</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}