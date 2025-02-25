import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import AppHeader from "./components/header/AppHeader/AppHeader.tsx"
import SubHeader from './components/header/SubHeader'
import Footer from './components/Footer/Footer.tsx'
import { Burger } from "./components/Burger/Burger.tsx";
import CabelProduct from "./components/CabelProduct/CabelProduct.tsx";
import Delivery from "./components/Delivery/Delivery.tsx";
import Main from "./components/Main.tsx";
import Payment from "./components/Payment/Payment.tsx";
import Return from "./components/Return/Return.tsx";
import Cart from "./components/Cart/Cart.tsx";
import Favorites from "./components/Favorites/Favorites.tsx";

import ProductPage from "./components/ProductPage/ProductPage.tsx";
import Contacts from "./components/Contacts/Contacts.tsx";
import Buyers from "./components/Buyers/Buyers.tsx";
import Compare from "./components/Compare/Compare.tsx";
import About from "./components/About/About.tsx";
import Policy from "./components/Policy/Policy.tsx";
import Offer from "./components/Offer/Offer.tsx";
import styles from './AppStyles.module.css';
import { ShopProvider } from './context/ShopContext';
import { PageTitleProvider } from './context/PageTitleContext';

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
		<PageTitleProvider defaultTitle="Интернет-магазин кабельной продукции" defaultSuffix="КабельОпт">
			<ShopProvider>
				<Router>
					<div className={styles.pageWrapper}>
						<div className={styles.pageContainer}>
							<AppHeader />
							{windowWidth > 1180 && <SubHeader />}
							{windowWidth < 1180 && <Burger />}
							<main className={styles.mainContent}>
								<Routes>
									<Route path="/" element={<Main />} />
									<Route path="/delivery" element={<Delivery />} />
									<Route path="/catalog" element={<CabelProduct />} />
									<Route path="/payment" element={<Payment />} />
									<Route path="/return" element={<Return />} />
									<Route path="/cart" element={<Cart />} />
									<Route path="/favorites" element={<Favorites />} />
									
									<Route path="/product/:id" element={<ProductPage />} />
									<Route path="/contacts" element={<Contacts />} />
									<Route path="/buyers" element={<Buyers />} />
									<Route path="/compare" element={<Compare />} />
									<Route path="/about" element={<About />} />
									<Route path="/policy" element={<Policy />} />
									<Route path="/offer" element={<Offer />} />
								</Routes>
							</main>
							<Footer />
						</div>
					</div>
				</Router>
			</ShopProvider>
		</PageTitleProvider>
	);
}

export default App
