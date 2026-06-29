import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartSummary() {

    const { cart, totalPrice, clearCart } = useCart();

    return (
        <div className="cart-summary">

            <h2>Résumé</h2>

            <p>Articles : {cart.length}</p>

            <p className="total">
                Total : {totalPrice.toFixed(2)} $
            </p>

            <button onClick={clearCart} className="btn">
                Vider le panier
            </button>

            <Link to="/checkout">
                <button className="btn primary">
                    Passer commande
                </button>
            </Link>

        </div>
    );
}