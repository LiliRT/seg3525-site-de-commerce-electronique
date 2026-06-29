import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { Link } from "react-router-dom";

export default function Cart() {

    const { cart } = useCart();

    return (
        <main className="container section">

            <h1>Votre panier</h1>

            {cart.length === 0 ? (
                <div>
                    <p>Votre panier est vide.</p>
                    <Link to="/catalogue">Aller au catalogue</Link>
                </div>
            ) : (
                <div className="cart-layout">

                    {/* LISTE */}
                    <div className="cart-list">

                        {cart.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}

                    </div>

                    {/* RESUME */}
                    <CartSummary />

                </div>
            )}

        </main>
    );
}