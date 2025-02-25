import { Route, Routes } from 'react-router-dom'
import Main from './components/Main.tsx'
import CabelProduct from './components/CabelProduct/CabelProduct.tsx'
import ProductPage from './components/ProductPage/ProductPage.tsx'
import Cart from './components/Cart/Cart.tsx'
import Favorites from './components/Favorites/Favorites.tsx'
import Compare from './components/Compare/Compare.tsx'
import About from './components/About/About.tsx'
import Contacts from './components/Contacts/Contacts.tsx'
import Delivery from './components/Delivery/Delivery.tsx'
import Payment from './components/Payment/Payment.tsx'
import Return from './components/Return/Return.tsx'
import Buyers from './components/Buyers/Buyers.tsx'
import Policy from './components/Policy/Policy.tsx'
import Offer from './components/Offer/Offer.tsx'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/catalog" element={<CabelProduct />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/return" element={<Return />} />
            <Route path="/buyers" element={<Buyers />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/offer" element={<Offer />} />
        </Routes>
    )
}

export default Router 