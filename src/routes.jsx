import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Survey from "./pages/Survey";
import Help from "./pages/Help";

export default function AppRoutes() {
    return (
        <Routes>

            <Route element={<Layout />}>

                <Route path="/" element={<Home />} />

                <Route path="/catalogue" element={<Catalogue />} />

                <Route path="/livre/:id" element={<Product />} />

                <Route path="/panier" element={<Cart />} />

                <Route path="/checkout" element={<Checkout />} />

                <Route path="/confirmation" element={<Confirmation />} />

                <Route path="/survey" element={<Survey />} />

                <Route path="/help" element={<Help />} />

            </Route>

        </Routes>
    );
}