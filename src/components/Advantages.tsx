import vector from "/img/Advantages/Vector.png"
import achiv from "/img/Advantages/achiv.png"
import delivery from "/img/Advantages/delivery.png"
import doggovor from "/img/Advantages/doggovor.png"
import time from "/img/Advantages/time.png"
interface ActionsProps {
	imagesrc: string;
	label: string;
}
export default function Advantages(){
	const advantagesList = [
		{ imagesrc: vector, label: "В наличии 10 000+ позиций" },
		{ imagesrc: time, label: "Отправка от 1 дня" },
		{ imagesrc: achiv, label: "Гарантия качества" },
		{ imagesrc: delivery, label: "Доставка по России в срок" },
		{ imagesrc: doggovor, label: "Работаем по договору" },
	 ];
	function Adv({imagesrc,label}:ActionsProps){
		return(
			<div style={{display:"flex",gap:15,alignItems:"center",marginBottom:"45px"}}>
				<img src={imagesrc} alt="" />
				<span style={{fontSize:18,lineHeight:"120%"}}>{label}</span>
			</div>
		)
	}
	return(
		<div style={{marginBottom:80}}>
			<div style={{padding:"0 84px" , display:"flex",width:"100%",justifyContent:"space-between"}}>
				{advantagesList.map((adv, index) => (
			<Adv key={index} imagesrc={adv.imagesrc} label={adv.label} />
				))}
			</div>
			<h2 style={{margin:"30px auto",display:"block",fontSize:25,fontWeight:"bold",lineHeight:"130%",textAlign:"center", }}>500+ компаний по всей РФ уже работают с нами</h2>
		</div>
	)
}
