
import PhoneMap from "./PhoneMap/PhoneMap"
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
			<PhoneMap />
		</div>
	)
}