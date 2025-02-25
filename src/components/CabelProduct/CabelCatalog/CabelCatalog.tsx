import styles from "./CabelCatalog.module.css"
import image2 from "/img/CabelCatalog/image-11.jpg"
import image1 from "/img/CabelCatalog/image13.png"
import image from "/img/CabelCatalog/image1.png"
import image4 from "/img/CabelCatalog/image.jpg"
import image5 from "/img/CabelCatalog/image2.png"
import image6 from "/img/CabelCatalog/image3.png"
import PageTitle from "../../PageTitle/PageTitle"

interface Props{
	image:string;
	label:string;
}
export default function CabelCatalog(){
	function Card({image,label}:Props){
		return(
			<div className={styles.card}>
				<img className={styles.image} src={image} alt="" />
				<h2>{label}</h2>
			</div>
		)
	}
	return(
		<div className={styles.cabel}>
			<PageTitle title="Кабельная продукция" />
			<h2>
				Кабельная продукция 
			</h2>
			<div className={styles.products}>
				<Card image={image1} label="Кабель"/>
				<Card image={image2} label="Провод"/>
				<Card image={image} label="Свет"/>
				<Card image={image4} label="Низковольтное оборудование "/>
				<Card image={image5} label="Системы безопасности"/>
				<Card image={image6} label="Материалы для прокладки кабеля"/>
			</div>
		</div>
	)
}