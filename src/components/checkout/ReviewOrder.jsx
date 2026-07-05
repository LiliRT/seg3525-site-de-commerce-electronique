import { useCart } from "../../context/CartContext";

export default function ReviewOrder({ shipping, payment }) {

    const { cart, subtotal, shipping: shippingCost, taxes, grandTotal } = useCart();

    const maskCard = (card) => {

        const digits = card.replace(/\s/g, "");

        if (digits.length < 4) return "••••";

        return "•••• •••• •••• " + digits.slice(-4);
    };

    return (

        <div className="review">

            <h2>Vérification de la commande</h2>

            {/* ARTICLES */}
            <section>

                

                {cart.map(item => (
                    <>
                        <h3>{item.quantity > 1 ? "Articles" : "Article"}</h3>
                        <div key={item.id} className="review-item">
                            <span>{item.title}</span>

                            <span>x {item.quantity}</span>

                            <span>{(item.price * item.quantity).toFixed(2)} $</span>
                        </div>
                    </>
                ))}

            </section>

            <hr />

            {/* LIVRAISON */}
            <section>

                <h3>Livraison</h3>

                <p><strong>{shipping.name}</strong></p>

                <p>{shipping.email}</p>

                <p>{shipping.phone}</p>

                <p>{shipping.address}{shipping.apartment && `, ${shipping.apartment}`}</p>

                <p>{shipping.city}, {shipping.province} {shipping.zip}</p>

                {!shipping.billingSame && (
                    <>
                        <p><strong>Adresse de facturation :</strong></p>

                        <p>{shipping.billingAddress}</p>

                        <p>{shipping.billingCity}, {shipping.billingProvince} {shipping.billingZip}</p>
                    </>
                )}

            </section>

            <hr />

            {/* PAIEMENT */}
            <section>
                <h3>Paiement</h3>

                <p>{payment.type === "credit" ? "Carte de crédit": "Carte de débit"}</p>

                <p>{maskCard(payment.card)}</p>

                <p>Expiration : {payment.exp}</p>
            </section>

            <hr />

            {/* RÉSUMÉ */}
            <section className="review-summary">
                <h3>Résumé</h3>

                <p>Sous-total : {subtotal.toFixed(2)} $</p>

                <p>Livraison : {shippingCost.toFixed(2)} $</p>

                <p>Taxes : {taxes.toFixed(2)} $</p>

                <p className="total">Total : {grandTotal.toFixed(2)} $</p>
            </section>

        </div>

    );

}