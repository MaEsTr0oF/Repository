import search from '/img/header/search.png'
import stat from '/img/header/stats.png'
import heart from '/img/header/heart.png'
import card from '/img/header/card.png'
import Actions from './Actions'
import styles from "./header.module.css";
export default function Header(){
	return(
		<header className={styles.header}>
			<div className={styles.header_container}>
				<div className={styles.header_content}>
					<div className={styles.header_logo}>
						Logo
					</div>
					<div className={styles.header_serchCatal}>
						<div className={styles.header_catalog}>
							<button type='submit'><div className={styles.burger}><span></span></div>Каталог</button>
						</div>
						<div className={styles.header_search}>
							<input type="text" placeholder='Поиск по товарам'/>
							<button type='submit'>
								<img src={search} alt="поиск" />
							</button>
						</div>
						</div>
						<div className={styles.header_actions}>
							<Actions imagesrc={stat} label={"Сравнение"} />
							<Actions imagesrc={heart} label={"Отложенные"} />
							<Actions imagesrc={card} label={"Корзина"} />
						</div>
					
				</div>
			</div>
		</header>
	)
}