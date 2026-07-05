import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartSummary() {

    const {
        cart,
        subtotal,
        taxes,
        shipping,
        grandTotal,
        clearCart
    } = useCart();

    const totalItems = cart.reduce( (sum, item) => sum + item.quantity, 0);

    const FREE_SHIPPING = 50;

    const progress = Math.min((subtotal / FREE_SHIPPING) * 100, 100);

    const remaining = Math.max(FREE_SHIPPING - subtotal, 0);

    return (
        <div className="summary"> 
            <div className="shipping-progress-card">

                <div className="shipping-progress-header">
                    <span>
                        {shipping === 0
                            ? "Félicitations! Vous profitez de la livraison gratuite."
                            : <>Ajoutez encore <strong>{remaining.toFixed(2)} $</strong> pour obtenir la livraison gratuite. <Link to="/catalogue" className="shipping-note-catalogue">Aller au catalogue<i className="bi bi-arrow-right"></i></Link></>
                        }
                    </span>

                    <div className="shipping-info">
                        <i className="bi bi-info-circle"></i>

                        <div className="shipping-tooltip">
                            <strong>Livraison gratuite</strong>
                            <p>La livraison standard est offerte pour toute commande de 50 $ ou plus, avant les taxes.</p>
                        </div>

                    </div>
                </div>

                <div className="shipping-progress-bar">
                    <div className="shipping-progress-fill" style={{ width: `${progress}%` }}/>
                </div>
            </div>

            <div className="cart-summary">

                <h2>Résumé</h2>

                <p>{totalItems} {totalItems > 1 ? "articles" : "article"}</p>

                <div className="summary-line">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)} $</span>
                </div>

                <div className="summary-line">
                    <span>Frais de livraison</span>

                    <span>
                        {shipping === 0
                            ? "Gratuite"
                            : `${shipping.toFixed(2)} $`}
                    </span>
                </div>

                <div className="summary-line">
                    <span>Taxes (TVH • 13 %)</span>
                    <span>{taxes.toFixed(2)} $</span>
                </div>

                <hr />

                <div className="summary-line total">
                    <span>Total</span>
                    <span>{grandTotal.toFixed(2)} $</span>
                </div>

                <div className="cart-summary-buttons">

                    <button
                        onClick={clearCart}
                        className="btn btn-secondary"
                    >
                        Vider le panier
                    </button>

                    <Link to="/checkout">
                        <button className="btn btn-primary">
                            Passer commande
                        </button>
                    </Link>

                </div>

            </div>
        </div>   
    );
}