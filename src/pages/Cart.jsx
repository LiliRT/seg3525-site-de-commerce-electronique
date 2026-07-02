import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Cart() {

    const { cart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="container section">

            <h1>Votre panier</h1>

            {cart.length === 0 ? (
                <div>
                    <p>Votre panier est vide.</p>
                    <button className="btn btn-primary"><Link to="/catalogue">Aller au catalogue</Link></button>
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