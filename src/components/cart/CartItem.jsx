import { useCart } from "../../context/CartContext";
import BookCover from "../books/BookCover";

export default function CartItem({ item }) {

    const { removeFromCart, updateQuantity } = useCart();

    return (
        <div className="cart-item">

            <div className="cart-cover">
                <BookCover
                    title={item.title}
                    author={item.author}
                    genre={item.genre}
                    minimal={true}
                />
            </div>

            <div className="cart-info">

                <h3>{item.title}</h3>

                <p>{item.author}</p>

                <div className="price-block">
                    {item.hasDiscount && (
                        <span className="old-price">
                            {item.originalPrice.toFixed(2)} $
                        </span>
                    )}

                    <span className="new-price">
                        {item.price.toFixed(2)} $
                    </span>
                </div>

                <div className="quantity">

                    <button
                        onClick={() =>
                            {
                                if (item.quantity === 1) {
                                    removeFromCart(item.id);
                                } else {
                                    updateQuantity(item.id, item.quantity - 1);
                                }
                            }
                        }
                    >
                        <i className="bi bi-dash-lg"></i>
                    </button>

                    <span>{item.quantity}</span>

                    <button
                        onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                        }
                    >
                        <i className="bi bi-plus-lg"></i>
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