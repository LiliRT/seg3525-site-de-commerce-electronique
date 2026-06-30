import Header from "./Header";
import Footer from "./Footer";
import FlyToCart from "../cart/FlyToCart";
import CartSnackbar from "../cart/CartSnackbar";

import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Layout() {

    const navigate = useNavigate();

    return (
        <>
            <div className="promo-bar">
                📚 Offre de la semaine : -20% sur les romans classiques et philosophiques
                <button onClick={() =>
                        navigate(
                            "/catalogue?genre=Roman%20classique&genre=Philosophie", {
                                state: {
                                    scrollToTop: true
                                }
                            }
                        )
                    }>
                    Voir
                </button>
            </div>

            <Header />

            <FlyToCart />

            <CartSnackbar />

            <Outlet />

            <Footer />
        </>
    );

}