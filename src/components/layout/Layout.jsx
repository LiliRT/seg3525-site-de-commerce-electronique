import Header from "./Header";
import Footer from "./Footer";

import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {

    const navigate = useNavigate();
    
    return (
        <>
            <div className="promo-bar">
                📚 Offre de la semaine : -20% sur les romans classiques et philosophiques
                <button onClick={() => navigate("/catalogue", {
                    state: { genre: ["Roman classique", "Philosophie"] }
                })}>
                    Voir
                </button>
            </div>

            <Header />

            <Outlet />

            <Footer />
        </>
    );

}