import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import AppHeader from "./components/header/AppHeader/AppHeader.tsx"
import SubHeader from './components/header/SubHeader'
import Footer from './components/Footer/Footer.tsx'
import BurgerMenu from "./components/Burger/Burger.tsx";
import CabelProduct from "./components/CabelProduct/CabelProduct.tsx";
import Delivery from "./components/Delivery/Delivery.tsx";
import Main from "./components/Main.tsx";
import Payment from "./components/Payment/Payment.tsx";
import Return from "./components/Return/Return.tsx";
import Cart from "./components/Cart/Cart.tsx";
import Favorites from "./components/Favorites/Favorites.tsx";
import Subcategory from "./components/Subcategory/Subcategory.tsx";
import ProductPage from "./components/ProductPage/ProductPage.tsx";
import Contacts from "./components/Contacts/Contacts.tsx";
import Buyers from "./components/Buyers/Buyers.tsx";
import Compare from "./components/Compare/Compare.tsx";

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
			{windowWidth > 1180 && <SubHeader />}
			{windowWidth < 1180 && <BurgerMenu />}
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/delivery" element={<Delivery />} />
				<Route path="/catalog" element={<CabelProduct />} />
				<Route path="/payment" element={<Payment />} />
				<Route path="/return" element={<Return />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/subcategory" element={<Subcategory />} />
				<Route path="/product/:id" element={<ProductPage />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/buyers" element={<Buyers />} />
				<Route path="/compare" element={<Compare />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App
