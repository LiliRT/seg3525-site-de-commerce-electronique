import { useCart } from "../../context/CartContext";

export default function ReviewOrder({ shipping, payment }) {

    const { cart, totalPrice } = useCart();

    return (
        <div>

            <h2>Vérification de la commande</h2>

            <h3>Articles</h3>

            {cart.map(item => (
                <p key={item.id}>
                    {item.title} x {item.quantity}
                </p>
            ))}

            <h3>Livraison</h3>

            <p>{shipping.name}</p>
            <p>{shipping.address}</p>
            <p>{shipping.city} {shipping.zip}</p>

            <h3>Total</h3>

            <p>{totalPrice.toFixed(2)} $</p>

        </div>
    );
}