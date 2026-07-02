import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartSummary() {

    const { cart, totalPrice, clearCart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="cart-summary">

            <h2>Résumé</h2>

            <p>{totalItems > 1 ? "Articles" : "Article"} : {totalItems}</p>

            <p className="total">
                Total : {totalPrice.toFixed(2)} $
            </p>

            <button onClick={clearCart} className="btn btn-secondary">
                Vider le panier
            </button>

            <Link to="/checkout">
                <button className="btn btn-primary">
                    Passer commande
                </button>
            </Link>

        </div>
    );
}