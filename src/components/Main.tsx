import AppPresentation from './main/AppPresentation/AppPresentatio.tsx'
import Advantages from './main/Advantages/Advantages.tsx'
import AppCables from './main/AppCables/AppCables.tsx'
import Appelectric from './main/Appelectric/Appelectric.tsx'
import AppAssec from './main/AppAssec/AppAssec.tsx'
import MainFind from './main/MainFind/MainFind.tsx'
import MainPluses from './main/MainPluses/MainPluses.tsx'
import MainDelyvery from './main/MainDelyvery/MainDelyvery.tsx'
import MainContForm from './main/MainContForm/MainContForm.tsx'
export default function Main(){
	return(
		<main>
			<AppPresentation />
			<Advantages />
			<AppCables />
			<Appelectric />
			<AppAssec />
			<MainFind />
			<MainPluses />
			<MainDelyvery />
			<MainContForm />
		</main>
	)
}