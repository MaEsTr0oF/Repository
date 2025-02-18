import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import AppHeader from "./components/header/AppHeader/AppHeader.tsx"
import SubHeader from './components/header/SubHeader'
import Footer from './components/Footer/Footer.tsx'
//  import Main from './components/Main.tsx'
import BurgerMenu from "./components/Burger/Burger.tsx";
import CabelProduct from "./components/CabelProduct/CabelProduct.tsx";
import Delivery from "./components/Delivery/Delivery.tsx";

function App() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		function handleResize() {
		  setWindowWidth(window.innerWidth);
		}
		window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Router>
		<AppHeader />
		{windowWidth > 1180 && <SubHeader /> }
		{windowWidth < 1180 && <BurgerMenu />}
		<Routes>
			<Route path="/" element={<CabelProduct />} />
			<Route path="/delivery" element={<Delivery />} />
		</Routes>
		{/* <Main /> */}
		<Footer />
	</Router>
  )
}

export default App
