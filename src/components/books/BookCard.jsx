import { Link } from "react-router-dom";
import Button from "../common/Button";
import { useCart } from "../../context/CartContext";

export default function BookCard({ book }) {

    const { addToCart } = useCart();

    return (
        <div className="book-card">

            <Link to={`/livre/${book.id}`}>
                <img
                    src={book.cover}
                    alt={book.title}
                    className="book-cover"
                />
            </Link>

            <div className="book-info">

                <h3>{book.title}</h3>

                <p className="author">{book.author}</p>

                <p className="price">{book.price.toFixed(2)} $</p>

                <div className="book-actions">

                    <Button onClick={() => addToCart(book)}>
                        Ajouter au panier
                    </Button>

                </div>

                <Link
                    to={`/livre/${book.id}`}
                    className="btn btn-secondary"
                >
                    Voir détails
                </Link>

            </div>

        </div>
    );
}