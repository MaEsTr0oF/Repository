import ProductCard from "./ProductCard";
import image from "/img/Electric/image.jpg"
import image1 from "/img/Electric/image1.jpg"
import image2 from "/img/Electric/image2.jpg"
export default function Appelectric(){
	const cabels_content = {
		display: "grid",
		gridTemplateColumns: "repeat(4, 1fr)", 
		gridTemplateRows: "auto", 
		gap: "20px", 
	 };
	return (
		<div style={{ padding: "0 20px",marginBottom:"40px" }}>
		  <div style={{ display: "flex", flexDirection: "column", gap: 45, justifyContent: "start" }}>
			 <h2 style={{ fontSize: 45, fontWeight: "bold", textAlign: "start" }}>Электротехническое оборудование</h2>
			 <div style={cabels_content}>
				<ProductCard
				  imagesrc={image}
				  label="Низковольтное оборудование"
				  text="Автоматические выключатели, УЗО, реле."
				  cost="0"
				/>
				<ProductCard
				  imagesrc={image1}
				  label="Системы безопасности"
				  text="Оборудование для охранной и пожарной сигнализации."
				  cost="0"
				/>
				<ProductCard
				  imagesrc={image2}
				  label="Материалы для прокладки кабеля"
				  text="Кабель-каналы, лотки, крепежи."
				  cost="0"
				/>
			 </div>
		  </div>
		</div>
	 );
}