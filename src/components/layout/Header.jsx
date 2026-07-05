import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";
import Logo from "../../assets/Logo";

export default function Header() {

    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null);
    const btnRef = useRef(null);
    const closeMenu = () => setMenuOpen(false);
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

    useEffect(() => {

        const handleClickOutside = (e) => {

            if (!menuOpen) return;

            const clickedInsideNav = navRef.current?.contains(e.target);
            const clickedButton = btnRef.current?.contains(e.target);

            if (!clickedInsideNav && !clickedButton) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => document.removeEventListener("click", handleClickOutside);

    }, [menuOpen]);

    return (

        <header className="header">

            <div className="container header-content">

                <Link to="/" className="logo clair" onClick={closeMenu}>
                    <Logo size={36} />
                    <span>Codex</span>
                </Link>

                <button
                    ref={btnRef}
                    className="menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i className="bi bi-list"></i>
                </button>

                <nav ref={navRef} className={menuOpen ? "nav open" : "nav"}>

                    <NavLink to="/" onClick={closeMenu}>Accueil</NavLink>

                    <NavLink to="/catalogue" onClick={closeMenu}>Catalogue</NavLink>

                    <NavLink to="/help" onClick={closeMenu}>Aide</NavLink>

                    <NavLink to="/panier" id="cart-button" className="cart-link" onClick={closeMenu}>
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