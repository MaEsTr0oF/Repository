import {  } from 'react'
import './App.css'
import AppHeader from "./components/header/AppHeader"
import SubHeader from './components/header/SubHeader'
import AppPresentation from './components/AppPresentatio.tsx'
import Advantages from './components/Advantages.tsx'
import AppCables from './components/AppCables.tsx'
import Appelectric from './components/Appelectric.tsx'
import AppAssec from './components/AppAssec.tsx'
function App() {
  return (
    <>
		<AppHeader />
		<SubHeader />
		<AppPresentation />
		<Advantages />
		<AppCables />
		<Appelectric />
		<AppAssec />
    </>
  )
}

export default App
