import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

export default function CartSnackbar() {

    const { removeFromCart } = useCart();
    const [item, setItem] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {

        const handler = (e) => {

            const book = e.detail?.book;

            if (!book) return;

            setItem(book);
            setVisible(true);

            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000);

            return () => clearTimeout(timer);
        };

        window.addEventListener("cart:add", handler);

        return () => window.removeEventListener("cart:add", handler);

    }, []);

    if (!visible || !item) return null;

    const undo = () => {
        removeFromCart(item.id);
        setVisible(false);
    };

    return (
        <div className="cart-snackbar top">

            <div>
                📚 <strong>{item.title}</strong> ajouté au panier
            </div>

            <div className="cart-snackbar-actions">

                <button onClick={undo}>
                    Annuler l'ajout au panier
                </button>

                <button onClick={() => setVisible(false)}>
                    <i className="bi bi-x"></i>
                </button>

            </div>

        </div>
    );
}