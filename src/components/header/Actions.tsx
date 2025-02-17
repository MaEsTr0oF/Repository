interface ActionsProps {
	imagesrc: string;
	label: string;
}
export default function Actions({imagesrc,label}:ActionsProps){
	return(
		<div className="header_action" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
			<img src={imagesrc} alt="stat" style={{objectFit:"cover",width:30}}/>
			<span style={{fontSize:"1rem",lineHeight:"130%"}}>{label}</span>
		</div>
	)
}