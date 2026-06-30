import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import Logo from "../../assets/Logo";

export default function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    const { cartCount } = useCart();

    const navigate = useNavigate();

    useEffect(() => {

        const handler = (e) => {

            const isMac = navigator.userAgent.includes("Mac");

            const shortcutPressed =
                (isMac && e.metaKey && e.key.toLowerCase() === "k") ||
                (!isMac && e.ctrlKey && e.key.toLowerCase() === "k");

            if (shortcutPressed) {
                e.preventDefault();
                navigate("/panier");
            }
        };

        window.addEventListener("keydown", handler);

        return () => window.removeEventListener("keydown", handler);

    }, [navigate]);

    return (

        <header className="header">

            <div className="container header-content">

                <Link to="/" className="logo">
                    <Logo size={36} />
                    <span>Codex</span>
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

                    <NavLink to="/panier" id="cart-button" className="cart-link">
                        <i className="bi bi-cart3"></i>

                        <span className="cart-count">{cartCount}</span>

                        <span className="cart-tooltip">
                            Cmd/Ctrl + K
                        </span>
                    </NavLink>

                </nav>

            </div>

        </header>
    );
}