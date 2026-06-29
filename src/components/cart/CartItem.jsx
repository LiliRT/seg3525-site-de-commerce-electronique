import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {

    const { removeFromCart, updateQuantity } = useCart();

    return (
        <div className="cart-item">

            <img src={item.cover} alt={item.title} />

            <div className="cart-info">

                <h3>{item.title}</h3>

                <p>{item.author}</p>

                <p>{item.price.toFixed(2)} $</p>

                <div className="quantity">

                    <button
                        onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                        }
                    >
                        -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                        onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                        }
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                className="remove"
                onClick={() => removeFromCart(item.id)}
            >
                <i className="bi bi-x-lg"></i>
            </button>

        </div>
    );
}