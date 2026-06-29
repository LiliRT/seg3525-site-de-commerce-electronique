import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    const { cartCount } = useCart();

    return (

        <header className="header">

            <div className="container header-content">

                <Link to="/" className="logo">
                    📚 BookNest
                </Link>

                <button
                    className="menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i className="bi bi-list"></i>
                </button>

                <nav className={menuOpen ? "nav open" : "nav"}>

                    <NavLink to="/">Accueil</NavLink>

                    <NavLink to="/catalogue">Catalogue</NavLink>

                    <NavLink to="/help">Aide</NavLink>

                    <NavLink to="/panier">

                        <i className="bi bi-cart3"></i>

                        <span className="cart-count">
                            {cartCount}
                        </span>

                    </NavLink>

                </nav>

            </div>

        </header>
    );
}