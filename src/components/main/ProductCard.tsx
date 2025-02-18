interface Props {
	imagesrc: string;
	label: string;
	text:string;
	cost:string;
}
export default function ProductCard({imagesrc,label,text,cost}:Props){
	return(
	<div style={{display:"flex",flexDirection:"column",gap:15,width:"100%",height:"100%",alignItems:"start",justifyContent:"space-between"}}>
		<img src={imagesrc} style={{boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",width:"100%",height:"220px",objectFit:"cover",borderRadius:"5px"}} alt="" />
		<h2 style={{fontSize:"18px",fontWeight:"bold"}}>{label}</h2>
		<span style={{fontSize:"16px"}}>{text}</span>
		{cost!="0" ? <span style={{color:"#2A9E44",fontSize:16}}>{`Цена: от ${cost} руб.`}</span> : <span style={{color:"#2A9E44",fontSize:16}}>Цена: по запросу</span> }
		<button type="submit" style={{height:35,width:173,color:"white",background:"#2A9E44",padding:"0.5rem",borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center"}}>
			<span>Товары</span>
		</button>
	</div>
	)
}