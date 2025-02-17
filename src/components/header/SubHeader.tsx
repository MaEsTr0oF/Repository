import place from "/img/header/place.png"
import ArrowDown from "/img/header/ArrowDown.png"
export default function SubHeader(){
	return(
		<div style={{
			display:"flex",
			justifyContent:"space-between",
			alignItems:"center",
			padding:"0 19px",
			marginBottom:25
		}}>
			<div style={{fontSize:"1rem",display:"flex",gap:25,fontWeight:"bold"}}>
				<button>О компании</button>
				<button>Покупателям</button>
				<button>Оплата и доставка</button>
				<button>Контакты</button>
			</div>
			<div style={{display:"flex",gap:74}}>
				<div style={{display:"flex",fontSize:"1rem",gap:12,alignItems:"center"}}>
				<img src={place} alt="" style={{objectFit:"cover",width:16}}/>
				<span>Выбрать город</span>
				<img src={ArrowDown} alt="" style={{objectFit:"cover",width:11}}/>
				</div>
				<div style={{fontWeight:"bold",fontSize:"1rem"}}>
					+7 (900) 999-99-99
				</div>
				<button type="submit" style={{height:35,width:173,color:"white",background:"#2A9E44",padding:"0.5rem",borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center"}}>
					<span>Оставить заявку</span>
				</button>
			</div>
		</div>
	)
}